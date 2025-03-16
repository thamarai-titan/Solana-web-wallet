import { StarterComponent } from "./components/StarterComponent.tsx";
import { Mnemonics } from "./components/Mnemonics.tsx";
import { Moon } from "./icons/Moon.tsx";
import { Wallet } from "./components/Wallet.tsx";
import { useRecoilState } from "recoil";
import { start } from "./atoms/start.ts";

function App() {

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


      {(starting) ? <StarterComponent/> : <div><Mnemonics/><Wallet/></div>}
      
     
    </div>
  );
}

export default App;
