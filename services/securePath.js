import aesjs from "aes-js";

const SECRET = process.env.NEXT_PUBLIC_SECRET;

export const encodePath = (path) => {
    const firstEncoded = btoa(path)
    const key = Uint8Array.from(Array.from(SECRET).map(letter => letter.charCodeAt(0)));
    const encodedBytes = aesjs.utils.utf8.toBytes(firstEncoded);
    const aejsCTR = new aesjs.ModeOfOperation.ctr(key);
    const encryptedBytes = aejsCTR.encrypt(encodedBytes);
    const encodedPath = aesjs.utils.hex.fromBytes(encryptedBytes);
    return encodedPath;
}

export const decodePath = (path) => {
    const key = Uint8Array.from(Array.from(SECRET).map(letter => letter.charCodeAt(0)));
    const encryptedBytes = aesjs.utils.hex.toBytes(path);
    const aejsCTR = new aesjs.ModeOfOperation.ctr(key);
    const decryptedBytes = aejsCTR.decrypt(encryptedBytes);
    const decodedPath = aesjs.utils.utf8.fromBytes(decryptedBytes);
    const finalPath = atob(decodedPath);
    return finalPath;
}