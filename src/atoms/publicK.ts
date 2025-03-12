import {atom} from "recoil"
export const publicK = atom<String>({
    key:"publicKey",
    default:""
})