import * as bip39 from "bip39";
import { Keypair, PublicKey } from "@solana/web3.js";
import { mnemonics } from "../atoms/mnemonics"
import { KeyPair } from "../atoms/KeyPair";
import { useRecoilState } from "recoil";
import { privateK } from "../atoms/privateK";
import { publicK } from "../atoms/publicK";
import { Delete } from "../icons/Delete";

export const Wallet = () => {

    const [mneMonics, setMnemonics] = useRecoilState(mnemonics);
    const [, setPrivateKey] = useRecoilState(privateK)
    const [, setPublicKey] = useRecoilState(publicK)
    const [keyPair, setkeyPair] = useRecoilState(KeyPair)

    const generateMnemonicFunction = async () => {
        const words = bip39.generateMnemonic(mneMonics.length === 12 ? 128 : 256);
        setMnemonics(words.split(" "));
        const seedPhrase = await bip39.mnemonicToSeed(words);
        const seed = seedPhrase.slice(0, 32); // Solana uses the first 32 bytes


        // Generate keypair from seed
        const keypair = Keypair.fromSeed(seed);

        // Convert keys to hex format
        const newPrivateKey = Buffer.from(keypair.secretKey).toString("hex")
        setPrivateKey(newPrivateKey);
        const newPublicKey = keypair.publicKey.toBase58()
        setPublicKey(newPublicKey);

        setkeyPair((prev) => [...prev, { PublicKey: newPublicKey, PrivateKey: newPrivateKey}])
        console.log(keyPair)


    };

    function clearWallets(){
        setkeyPair([])
    }
    
    function clearCurrentWallet(p:String){
        setkeyPair(prev=>prev.filter(pair=>pair.PublicKey !== p));
    }

    return (
        <div>
            <div className="flex justify-between items-center p-9">
                <div className="text-2xl font-mono font-medium">
                    Solana Wallets
                </div>
                <div className="flex gap-5">
                    <button className="p-3 bg-black text-white rounded hover:bg-gray-800 font-mono" onClick={()=>generateMnemonicFunction()}>Add Wallet</button>
                    <button className="p-3 bg-red-500 text-white rounded hover:bg-red-600" onClick={()=>clearWallets()}>Clear Wallets</button>
                </div>
            </div>
            <div>
                <div>
                    {
                    keyPair.length > 0 ? (
                        keyPair.map((pair,index)=>(
                            <div key={index} className="border-1 m-5 rounded bg-gray">
                                    <div className="flex justify-between items-center p-7">
                                        <div className="font-mono text-2xl font-bold">
                                            Wallet {index + 1}
                                        </div>
                                        <div className="text-red-600" onClick={()=>clearCurrentWallet(pair.PublicKey)}>
                                            <Delete/>
                                        </div>
                                    </div>
                                    <div className="p-7">
                                        <div className="font-mono text-xl font-light pb-3">Public Key</div>
                                        <div className="cursor-pointer">{pair.PublicKey}</div>
                                    </div>
                                    <div className="p-7"> 
                                        <div className="font-mono text-xl font-light pb-3 ">Private Key</div>
                                        <div className="cursor-pointer">{pair.PrivateKey}</div>
                                    </div>
                            </div>
                        ))
                    ):(<h3 className="p-10 text-xl font-light ">No Wallets .</h3>)}
                </div>
            </div>
        </div>
    )
}