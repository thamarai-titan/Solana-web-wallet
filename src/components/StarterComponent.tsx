import { useRecoilState } from "recoil";
import { start } from "../atoms/start";

export function StarterComponent() {
    const [starting , setStarting] = useRecoilState(start)

    

    return (
        <div>
            <div className="border-1 m-5">
                <div className="px-9 pt-9 text-2xl font-black font-mono">
                    Create Your Wallet with Solana
                </div>
                <button className="p-9" onClick={()=>setStarting(!starting)}>
                    <span className="border-2 p-3 bg-black text-white rounded">
                        Solana
                    </span>
                </button>
            </div>
        </div>

    );
}
