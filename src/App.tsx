import { StarterComponent } from "./components/StarterComponent.tsx";
import { Mnemonics } from "./components/Mnemonics.tsx";
import { Moon } from "./icons/Moon.tsx";
import { Wallet } from "./components/Wallet.tsx";
import { useRecoilState } from "recoil";
import { start } from "./atoms/start.ts";
export default function App() {

  const [starting] = useRecoilState(start)

  return (
    <div>
      <div className="flex justify-between p-9 font-mono font-bold text-4xl items-center">
        <div>Wallet</div>
        <div>
          <button>
            <Moon />
          </button>
        </div>

      </div>
      <div className="p-12">
        <div className="text-center p-5">
          <h1 className="text-3xl md:text-4xl font-bold font-mono">Manage Your Solana Wallets</h1>
          <p className="text-gray-600 text-sm md:text-base mt-2">
            Generate, store, and manage multiple wallets securely.
          </p>
        </div>

      </div>


     <div className="p-5">
     {(starting) ? <StarterComponent /> : <div><Mnemonics /><Wallet /></div>}
     </div>


    </div>
  );
}