// src/atoms/seedAtom.ts
import { atom } from "recoil";

export const seedAtom = atom<Uint8Array | null>({
    key: "seedAtom",
    default: null,
});
