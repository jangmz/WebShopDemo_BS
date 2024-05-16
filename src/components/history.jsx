import TokenMessage from "./tokenMessage";
import { TokenContext, PastOrdersContext } from "../App";
import { useContext, useEffect, useState } from "react";

export default function History() {
    const { token } = useContext(TokenContext);
    //const { orderKeys } = useContext(PastOrdersContext);
    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true);

    //orderKeys.map(orderKey => console.log(orderKey));

    useEffect(() => {
        let orders;
        // retrieve orders
        fetch("http://webshopdemo.devweb.b-s.si/api/public/WebShopDemo/pub/FLB/Order/?%24top=30", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json",
            }
        })
        .then(responseOrders => {
            if (!responseOrders.ok) {
                throw new Error("Failed to retrieve orders");
            }

            return responseOrders.json();
        })
        .then(dataOrders => {
            
            // save only orders from "demo@local"
            orders = dataOrders.filter(order => order.metaData.createdBy === "demo@local");
            //console.log(dataOrders);

            // retrieve order items
            orders.map(order => {
                let tempOrderDataArray = [order];
                fetch(`http://webshopdemo.devweb.b-s.si/api/public/WebShopDemo/pub/FLB/Order Item/?%24filter=order_Lookup%20eq%20${order.key}&%24top=30`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-type": "application/json",
                    }
                })
                .then(responseOrderItems => {
                    if (!responseOrderItems.ok) {
                        throw new Error("Failed to retrieve order items");
                    }
                    
                    return responseOrderItems.json();
                })
                .then(orderItemsData => {
                    console.log("ORDER ITEMS:");
                    console.log(orderItemsData);
                    tempOrderDataArray.push(orderItemsData);
                    setOrdersData([...ordersData], tempOrderDataArray);
                })
                .catch(error => console.error(error))
            })
        })
        .catch(error => {
            console.error(error);
        })
        .finally(setLoading(false))        
    }, []);

    if (token !== null && loading) {
        return (
            <>
                <h1>Order history</h1>
                <p>Loading...</p>
            </>
        )
    }

    return (
        <>
            <h1>Order history</h1>
            <TokenMessage />
            <table>
                <thead>
                    <th>Order date</th>
                    <th>Order key</th>
                </thead>
                <tbody>
                </tbody>
            </table>
        </>
    )
}