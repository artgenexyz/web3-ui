import React, { useState, createContext } from "react";
import {WalletState} from "./crypto";

interface ContextInterface {
    walletState: WalletState
}

const defaultContext = {
    walletState: WalletState.NOT_LOADED
}

export const Web3Context = createContext<[ContextInterface, any]>([defaultContext, () => defaultContext]);

export const Web3Provider = (props) => {
    const [state, setState] = useState(defaultContext);

    return (
        <Web3Context.Provider value={[state, setState]}>
            {props.children}
        </Web3Context.Provider>
    );
};
