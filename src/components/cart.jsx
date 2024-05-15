import TokenMessage from "./tokenMessage";
import { TokenContext, CartContext } from "../App";
import { useContext } from "react";

export default function Cart() {
    const { token } = useContext(TokenContext);
    const { cart, setCart } = useContext(CartContext);
    let totalAmount = 0;

    cart.map(item => totalAmount += (item.quantity * item.amount));

    return (
        <>
            <h1>Cart</h1>
            <TokenMessage />
            <table className="cart">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Total amount: <strong>{totalAmount}</strong></p>
            <button>Order</button>
        </>
    )
}