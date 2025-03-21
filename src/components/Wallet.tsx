import * as bip39 from "bip39";
import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import { useRecoilState, useSetRecoilState } from "recoil";
import { mnemonics } from "../atoms/mnemonics";
import { KeyPair } from "../atoms/KeyPair";
import { privateK } from "../atoms/privateK";
import { publicK } from "../atoms/publicK";
import { Delete } from "../icons/Delete";
import { useEffect, useState } from "react";
import { start } from "../atoms/start";
import { seedAtom } from "../atoms/seedAtom";
import { motion, AnimatePresence } from "framer-motion";

interface WalletInfo {
    PublicKey: string;
    PrivateKey: string;
    Path: string;
}

interface Notification {
    id: number;
    message: string;
}

export const Wallet: React.FC = () => {
    const [mneMonics, setMnemonics] = useRecoilState(mnemonics);
    const [, setPrivateKey] = useRecoilState(privateK);
    const [, setPublicKey] = useRecoilState(publicK);
    const [keyPair, setKeyPair] = useRecoilState<WalletInfo[]>(KeyPair);
    const setSeed = useSetRecoilState(seedAtom);
    const [walletCount, setWalletCount] = useState<number>(0);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const generateFirst = async () => {
        const words: string = bip39.generateMnemonic(mneMonics.length === 12 ? 128 : 256);
        setMnemonics(words.split(" "));
        const seedPhrase: Buffer = await bip39.mnemonicToSeed(words);
        const newSeed: Buffer = seedPhrase.slice(0, 32);
        setSeed(newSeed);
        setWalletCount(0);
    };

    useEffect(() => {
        generateFirst();
    }, [start]);

    const deriveSolanaKeypair = async (index: number) => {
        if (!mneMonics.length) return;

        const seedPhrase: Buffer = await bip39.mnemonicToSeed(mneMonics.join(" "));
        const derivationPath: string = `m/44'/501'/${index}'/0'`;
        const derivedSeed = derivePath(derivationPath, seedPhrase.toString("hex")).key;
        const keypair = Keypair.fromSeed(derivedSeed);

        const newPrivateKey: string = Buffer.from(keypair.secretKey).toString("hex");
        const newPublicKey: string = keypair.publicKey.toBase58();

        setPrivateKey(newPrivateKey);
        setPublicKey(newPublicKey);
        setKeyPair((prev) => [...prev, { PublicKey: newPublicKey, PrivateKey: newPrivateKey, Path: derivationPath }]);
        setWalletCount(walletCount + 1);
        showNotification("Wallet Created");
    };

    const clearWallets = () => {
        setKeyPair([]);
        setWalletCount(0);
        showNotification("All Wallets Cleared");
    };

    const clearCurrentWallet = (publicKey: string) => {
        setKeyPair((prev) => prev.filter((pair) => pair.PublicKey !== publicKey));
        showNotification("Wallet Deleted");
    };

    const showNotification = (message: string) => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, 2000);
    };

    return (
        <div>
            <div className="flex justify-between items-center p-9">
                <div className="text-2xl font-mono font-medium">Solana Wallets</div>
                <div className="flex gap-5">
                    <button className="p-3 bg-black text-white rounded hover:bg-gray-800 font-mono" onClick={() => deriveSolanaKeypair(walletCount)}>Add Wallet</button>
                    <button className="p-3 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => clearWallets()}>Clear Wallets</button>
                </div>
            </div>
            <div>
                {keyPair.length > 0 ? (
                    keyPair.map((pair, index) => (
                        <div key={index} className="border-1 m-5 rounded bg-gray">
                            <div className="flex justify-between items-center p-7">
                                <div className="font-mono text-2xl font-bold">Wallet {index + 1}</div>
                                <div className="text-red-600" onClick={() => clearCurrentWallet(pair.PublicKey)}><Delete /></div>
                            </div>
                            <div className="p-7">
                                <div className="font-mono text-xl font-light pb-3">Public Key</div>
                                <div className="cursor-pointer">{pair.PublicKey}</div>
                            </div>
                            <div className="p-7">
                                <div className="font-mono text-xl font-light pb-3">Private Key</div>
                                <div className="cursor-pointer">{pair.PrivateKey}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h3 className="p-10 text-xl font-light">No Wallets.</h3>
                )}
            </div>
            {/* Notification Cards */}
            <div className="fixed top-10 left-1/2 transform -translate-x-1/2">
                <AnimatePresence>
                    {notifications.map((note) => (
                        <motion.div key={note.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="bg-black text-white p-3 rounded shadow-lg text-center mb-2">
                            {note.message}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}; 