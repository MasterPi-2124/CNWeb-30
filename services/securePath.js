import aesjs from "aes-js";
import sha256 from "crypto-js/sha256";

const SECRET = process.env.NEXT_PUBLIC_SECRET;

export const encodePath = (path) => {
    console.log(path)
    const firstEncoded = btoa(path)
    const key = Uint8Array.from(Array.from(SECRET).map(letter => letter.charCodeAt(0)));
    const encodedBytes = aesjs.utils.utf8.toBytes(firstEncoded);
    const aejsCTR = new aesjs.ModeOfOperation.ctr(key);
    const encryptedBytes = aejsCTR.encrypt(encodedBytes);
    const encodedPath = aesjs.utils.hex.fromBytes(encryptedBytes);
    const sha = sha256(encodedPath);
    const ddd = aesjs.utils.hex.fromBytes(sha.init.words)
    console.log(ddd)
    return encodedPath;
}

export const decodePath = (path) => {
    const key = Uint8Array.from(Array.from(SECRET).map(letter => letter.charCodeAt(0)));
    const encryptedBytes = aesjs.utils.hex.toBytes(path);
    const aejsCTR = new aesjs.ModeOfOperation.ctr(key);
    const decryptedBytes = aejsCTR.decrypt(encryptedBytes);
    const decodedPath = aesjs.utils.utf8.fromBytes(decryptedBytes);
    const finalPath = atob(decodedPath);
    console.log(finalPath);
    return finalPath;
}