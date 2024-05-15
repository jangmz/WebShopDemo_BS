import TokenMessage from "./tokenMessage";
import { TokenContext } from "../App";
import { useContext } from "react";

export default function Cart() {
    const {token, setToken} = useContext(TokenContext);

    return (
        <>
            <h1>Cart</h1>
            <TokenMessage />
        </>
    )
}