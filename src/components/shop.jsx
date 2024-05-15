import TokenMessage from "./tokenMessage";
import { TokenContext, CartContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "./itemCard";

export default function Shop() {
    const { token } = useContext(TokenContext); // authorization token
    const { cart, setCart } = useContext(CartContext);
    const [items, setItems] = useState();
    const [loading, setLoading] = useState(true);
    const navigation = useNavigate(); // delete this when finished <----------------------

    // fetch items
    useEffect(() => {
        fetch("http://webshopdemo.devweb.b-s.si/api/public/WebShopDemo/pub/FLB/Item/?%24top=30", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            setItems(data);
        })
        .finally(() => setLoading(false));
    }, [])

    // while items are being fetched
    if (loading) {
        return (
            <>
                <h1>Shop</h1>
                <div className="message">
                    <p>Loading...</p>
                </div>
            </>
        )
    }

    // delete this when finished <----------------------------
    if (token === null) {
        navigation("/login");
    }

    // adding item to a cart
    function handleAddToCart(itemId, quantity) {
        //console.log("Item ID: " + itemId);
        //console.log("Quantity: " + quantity);
        const newItem = items.find(item => item.id === itemId);
        newItem.quantity = quantity;
        // handle adding to a cart
        setCart([...cart, newItem]);
    }

    return (
        <>
            <h1>Shop</h1>
            <TokenMessage />
            <div className="items">
                {items.map(item => (
                    <ItemCard key={item.id} item={item} handleAddToCart={handleAddToCart} />
                ))}
            </div> 
        </>
    )
}