import TokenMessage from "./tokenMessage";
import { TokenContext, CartContext } from "../App";
import { useContext, useState } from "react";

export default function Cart() {
    const { token } = useContext(TokenContext);
    const { cart, setCart } = useContext(CartContext);
    let totalAmount = 0;

    cart.map(item => totalAmount += (item.quantity * item.amount));

    async function handleOrder() {
        try {
            console.log("Cart: ");
            console.log(cart);
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

            const orderData = await orderResponse.json();
            console.log("Order:");
            console.log(orderData);
            console.log("Order ID: " + orderData.id);

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
                        item_Lookup: cart[i].id,
                        order_Lookup: orderData.id,
                        quantity: cart[i].quantity,
                    })
                });

                const itemData = await itemResponse.json();
                console.log("Item added to order: ");
                console.log(itemData);
            }

            //setCart([]);

        } catch (error) {
            console.error("Error placing order: " + error);
        }
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
            <button onClick={handleOrder}>Order now</button>
        </>
    )
}

/*
request body
{
  "item_Lookup": "string",
  "quantity": 0,
  "total_Amount": 0,
  "amount": 0,
  "name": "string",
  "order_Lookup": "string",
  "eTag": "string",
  "id": "string",
  "key": "string"
}
*/