import TokenMessage from "./tokenMessage";
import { TokenContext, CartContext } from "../App";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemCard from "./itemCard";

export default function Shop() {
    const { token } = useContext(TokenContext); // authorization token
    const { cart, setCart } = useContext(CartContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // fetch items to be displayed
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
            setItems(data);
        })
        .finally(() => setLoading(false));
    }, [])

    // while items are being fetched
    if (loading && token !== null) {
        return (
            <>
                <h1>Shop</h1>
                <div className="message">
                    <p>Loading...</p>
                </div>
            </>
        )
    }

    // adding item to a cart
    function handleAddToCart(itemId, quantity) {
        const newItem = items.find(item => item.id === itemId);
        newItem.quantity = quantity;
        setCart([...cart, newItem]);
    }

    return (
        <>
            <h1>Shop</h1>
            {items.length === 0 
                ? <TokenMessage /> 
                :
                <div className="items">
                    {items.map(item => (
                        <ItemCard key={item.id} item={item} handleAddToCart={handleAddToCart} />
                    ))}
                </div> 
            }
        </>
    )
}