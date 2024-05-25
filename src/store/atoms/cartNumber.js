import {atom} from "recoil";

export const cartNumberState = atom({
    key:"cartNumberState",
    default:{
        productNumber:0
    }
})
