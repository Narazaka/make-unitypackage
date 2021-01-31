import { zip } from "gzip-js";
import * as Tar from "tar-js"; // esbuild wrong compile with `import * as Tar ...`

export interface FileInfo {
    path: string;
    data: string | Uint8Array;
}

const metaPathRe = /\.meta$/;
const guidRe = /(?:^|\n)guid: (\S+)/;
const folderAssetRe = /(?:^|\n)folderAsset: yes/;
const textDecoder = new TextDecoder();

export function makeUnityPackageRaw(files: FileInfo[]) {
    const normalIndexes: {[path: string]: number} = {};
    const metaIndexes: {[path: string]: { index: number; guid: string; folderAsset: boolean }} = {};
    for (let i = 0; i < files.length; ++i) {
        const file = files[i];
        if (metaPathRe.test(file.path)) {
            const targetPath = file.path.replace(metaPathRe, "");
            const data = typeof file.data === "string" ? file.data : textDecoder.decode(file.data);
            const guid = guidRe.exec(data)![1];
            const folderAsset = folderAssetRe.test(data);
            metaIndexes[targetPath] = {
                index: i,
                guid,
                folderAsset,
            };
        } else {
            normalIndexes[file.path] = i;
        }
    }
    const tar = new Tar();
    const targetPaths = Object.keys(metaIndexes);
    for (let i = 0; i < targetPaths.length; ++i) {
        const targetPath = targetPaths[i];
        const normalIndex = normalIndexes[targetPath];
        const meta = metaIndexes[targetPath];
        if (!meta.folderAsset) tar.append(`${meta.guid}/asset`, files[normalIndex].data);
        tar.append(`${meta.guid}/asset.meta`, files[meta.index].data);
        tar.append(`${meta.guid}/pathname`, targetPath);
    }
    return zip(tar.out as any, {name: "archtemp.tar"});;
}

export function makeUnityPackage(files: FileInfo[]) {
    return new Uint8Array(makeUnityPackageRaw(files));
}
