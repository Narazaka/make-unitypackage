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

browser:

```typescript
import { makeUnityPackage } from "make-unitypackage";

const files = [
    {
        path: "Foo/Bar.cs",
        data: new Uint8Array(new TextEncoder().encode("using UnityEngine; public class Bar : MonoBehaviour { public GameObject obj; }")),
    },
    {
        path: "Foo/Bar.cs.meta",
        data: new Uint8Array(new TextEncoder().encode("fileFormatVersion: 2\nguid: 02b4f861808199e4a904bba10680f423\n")),
    }
];

const unitypackage = makeUnityPackage(files);
```

## License

[Zlib](LICENSE)
