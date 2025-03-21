import {atom} from "recoil"
export const publicK = atom<string>({
    key:"publicKey",
    default:""
})