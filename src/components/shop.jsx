import TokenMessage from "./tokenMessage";
import { TokenContext } from "../App";
import { useContext } from "react";

export default function Shop() {
    const {token, setToken} = useContext(TokenContext);

    return (
        <>
            <h1>Shop</h1>
            <TokenMessage />
        </>
    )
}