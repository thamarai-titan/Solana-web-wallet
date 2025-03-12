import {atom} from "recoil"
export const privateK = atom<String>({
    key:"privateKey",
    default:""
})