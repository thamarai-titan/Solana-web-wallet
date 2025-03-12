import { useState } from "react";
import { DownArrow } from "../icons/DowmArrow";
import { mnemonics } from "../atoms/mnemonics";
import { useRecoilValue } from "recoil";
import {motion} from "framer-motion"



export function Mnemonics() {
    const [ExpandDiv, SetExpandDiv] = useState(false)
    const words = useRecoilValue(mnemonics)
    return (

        <div className="m-5">
            <div className="p-8 border-1">
                <div className="flex justify-between items-center text-2xl font-medium">
                    <div className="font-mono">
                        Your Secret Phrase
                    </div>
                    <button className="p-3 rounded hover:bg-gray-100" onClick={() => SetExpandDiv(!ExpandDiv)}>
                        <DownArrow />
                    </button>
                </div>
                { ExpandDiv && <div className="h-72 transition-all duration-500 opacity-100 scale-100 transform ease-in-out">
                    
                    <motion.div 
                        initial={{ height: 0, opacity: 0, scale: 0.9 }}
                        animate={{ height: "auto", opacity: 1, scale: 1 }}
                        exit={{ height: 0, opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="grid grid-cols-4 pt-10 gap-4">
                        { words.map((word,index)=>(
                            <div key={index} className="border-1 p-3">
                                {index + 1}. {word}
                            </div>
                        ))}
                    </motion.div>
                    
                    </div>}
                
            </div>
        </div>
    )
}