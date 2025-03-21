import {atom} from "recoil"
export const privateK = atom<string>({
    key:"privateKey",
    default:""
})