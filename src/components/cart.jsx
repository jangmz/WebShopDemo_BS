import TokenMessage from "./tokenMessage";
import { TokenContext, CartContext, PastOrdersContext } from "../App";
import { useContext } from "react";

export default function Cart() {
    const { token } = useContext(TokenContext);
    const { cart, setCart } = useContext(CartContext);
    let totalAmount = 0;

    cart.map(item => totalAmount += (item.quantity * item.amount));

    async function handleOrder() {
        try {
            // create an order
            const orderResponse = await fetch("http://webshopdemo.devweb.b-s.si/api/public/WebShopDemo/pub/FLB/Order", {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ship_To_Address: "Test Rd 23",
                    ship_To_City: "Test City",
                    ship_To_Name: "demo@local",
                    ship_To_Post_Code: "5000",
                })
            });

            if (!orderResponse.ok) {
                throw new Error("Failed to create order");
            }

            const orderData = await orderResponse.json();

            // adding items to the order
            for (let i = 0; i < cart.length; i++) {
                console.log("Item ID: " + cart[i].id);
                const itemResponse = await fetch("http://webshopdemo.devweb.b-s.si/api/public/WebShopDemo/pub/FLB/Order Item", {
                    method: "PUT",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        item_Lookup: cart[i].key,
                        order_Lookup: orderData.key,
                        quantity: cart[i].quantity,
                    })
                });

                if (!itemResponse.ok) {
                    throw new Error("Failed to add item to order");
                }

                const itemData = await itemResponse.json();
            }

            // clear the cart
            setCart([]);

        } catch (error) {
            console.error(error);
        }
    }

    function handleRemove(itemId) {
        const newCart = cart.filter(item => item.id !== itemId);
        setCart(newCart);
    }

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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.amount}</td>
                            <td><button className="btn rem-btn" onClick={() => handleRemove(item.id)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <p>Total amount: <strong>{totalAmount}</strong></p>
            <button className="btn" onClick={handleOrder}>Order now</button>
        </>
    )
}