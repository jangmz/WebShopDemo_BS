import TokenMessage from "./tokenMessage";
import { TokenContext } from "../App";
import { useContext, useEffect, useState } from "react";
import ItemCard from "./itemCard";

export default function Shop() {
    const { token } = useContext(TokenContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);


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

    if (loading) {
        return (
            <div className="message">
                <p>Loading...</p>
            </div>
        )
    }

    return (
        <>
            <h1>Shop</h1>
            <TokenMessage />
            <div className="items">
                {items.map(item => {
                    <ItemCard item={item} />
                })}
            </div> 
        </>
    )
}