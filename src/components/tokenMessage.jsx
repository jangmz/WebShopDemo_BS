import { useContext } from "react";
import { TokenContext } from "../App";

export default function TokenMessage() {
    const {token, setToken} = useContext(TokenContext);

    return (
        <>
            { token === null
            ? <div className="message">
                <p>Please authenticate first.</p>
            </div>
            : <div></div>}
        </>
    )
}