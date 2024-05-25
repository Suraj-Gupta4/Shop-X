
import { cartNumberState } from "../atoms/cartNumber";
import {selector} from 'recoil';

export const updatedNumber = selector({
    key:'updatedNumber',
    get: ({get}) => {
        const state = get(cartNumberState);

        return state.productNumber;

    }
})