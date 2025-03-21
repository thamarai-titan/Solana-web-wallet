import { atom } from "recoil";

interface WalletInfo {
    PublicKey: string;
    PrivateKey: string;
    Path: string;
}

// ✅ Ensure KeyPair is correctly typed
export const KeyPair = atom<WalletInfo[]>({
    key: "KeyPair",
    default: [],
});
