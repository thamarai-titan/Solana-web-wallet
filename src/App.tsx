import { StarterComponent } from "./components/StarterComponent.tsx";
import { Mnemonics } from "./components/Mnemonics.tsx";
import { Moon } from "./icons/Moon.tsx";
import { Wallet } from "./components/Wallet.tsx";

function App() {
 

 
  return (
    <div>
      <div className="flex justify-between p-9 font-mono font-bold text-4xl items-center">
        <div>Wallet</div>
        <div>
          <button>
            <Moon/>
          </button>
        </div>
      </div>
      <Mnemonics />
      <Wallet/>
    </div>
  );
}

export default App;
