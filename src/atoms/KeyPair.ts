import {atom} from "recoil"

export const KeyPair = atom<{PublicKey: String; PrivateKey: String}[]>({
    key:"KeyPair",
    default:[]
})