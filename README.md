# make-unitypackage

make unitypackage! (browser compatible)

## Usage

node:

```typescript
import { makeUnityPackage } from "make-unitypackage";
import { FSO } from "fso";

const assets = new FSO("./Assets");
const files = [];
for (const entry of assets.join("Foo").childrenAllSync().filter(entry => !entry.isDirectorySync())) {
    files.push({
        path: assets.relative(entry).path,
        data: new Uint8Array(entry.readFileSync()),
    });
}

const unitypackage = makeUnityPackage(files);
new FSO("a.unitypackage").writeFileSync(unitypackage);
```

## License

[Zlib](LICENSE)
