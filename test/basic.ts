import * as assert from "power-assert";
import { makeUnityPackage } from "../index";

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

describe("makeUnityPackage", () => {
    it("should make unitypackage", () => {
        const unitypackage = makeUnityPackage(files);
        assert(unitypackage instanceof Uint8Array);
    });
});
