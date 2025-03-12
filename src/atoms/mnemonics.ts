import {atom} from "recoil"

export const mnemonics = atom<string[]>({
    key:"mnemonics",
    default:[...Array(12).fill("")]
});



