import { useState } from "react";
import { DownArrow } from "../icons/DowmArrow";
import { mnemonics } from "../atoms/mnemonics";
import { useRecoilValue } from "recoil";
import { motion, AnimatePresence } from "framer-motion";

export function Mnemonics() {
    const [ExpandDiv, SetExpandDiv] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const words = useRecoilValue(mnemonics);

    const copyToClipboard = () => {
        const mnemonicText = words.join(" ");
        navigator.clipboard.writeText(mnemonicText)
            .then(() => {
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000); // Hide after 2s
            })
            .catch(err => console.error("Failed to copy: ", err));
    };

    return (
        <div className="m-5 relative">
            <div className="p-8 border-1">
                <div className="flex justify-between items-center text-2xl font-medium">
                    <div className="font-mono">Your Secret Phrase</div>
                    <div className="flex gap-3">
                        <button
                            className="border-1 p-2 font-mono text-[16px] hover:bg-gray-200"
                            onClick={copyToClipboard}
                        >
                            Click to Copy
                        </button>
                        <button
                            className="p-3 rounded hover:bg-gray-100"
                            onClick={() => SetExpandDiv(!ExpandDiv)}
                        >
                            <DownArrow />
                        </button>
                    </div>
                </div>
                <AnimatePresence>
    {ExpandDiv && (
        <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Smooth cubic bezier easing
            className="grid grid-cols-4 pt-5 gap-4"
        >
            {words.map((word, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }} // Staggered effect
                    className="border p-3 rounded bg-white text-gray-900"
                >
                    {index + 1}. {word}
                </motion.div>
            ))}
        </motion.div>
    )}
</AnimatePresence>


            </div>
            
            {/* Copy Confirmation Notification */}
            <AnimatePresence>
                {showCopied && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-5 py-3 rounded shadow-lg"
                    >
                        Copied to Clipboard
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
