import TokenMessage from "./tokenMessage";
import { TokenContext } from "../App";
import { useContext, useEffect, useState } from "react";

export default function History() {
    const { token } = useContext(TokenContext);
    const [ordersData, setOrdersData] = useState([]);
    const [loading, setLoading] = useState(true); 

    // retrieve order keys
    useEffect(() => {
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
        .then(APIOrdersData => {
            // extract orders created by "demo@local" 
            // hardcoded for development purposes
            const orders = APIOrdersData.filter(order => order.metaData.createdBy === "demo@local");

            // save order keys & date to the state
            setOrdersData(orders.map(order => ({
                orderKey: order.key,
                orderDate: formatDate(order.metaData.created),
                orderItems: []
            })));

            // retrieve order items for each order
            // waiting for all promises to resolve before proceeding
            return Promise.all(orders.map(order => retrieveOrderItems(order.key)));
        })
        .then(allOrderItems => {
            // save order items to the state
            setOrdersData(prevOrdersData => prevOrdersData.map((order, index) => ({ ...order, orderItems: allOrderItems[index]})));
        })
        .catch(error => {
            console.error(error);
        })
        .finally(setLoading(false))
    }, [token]);

    // retrieves items from an order by key
    async function retrieveOrderItems(orderKey) {
        const responseOrderItems = await fetch (`http://webshopdemo.devweb.b-s.si/api/public/WebShopDemo/pub/FLB/Order Item/?%24filter=order_Lookup%20eq%20${orderKey}&%24top=30`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-type": "application/json",
            }
        })
        
        if (!responseOrderItems.ok) {
            throw new Error("Failed fetching order items");
        }

        const orderItems = await responseOrderItems.json();

        return orderItems;
    }

    // formats date into "DD.MM.YYYY (HH:MM)"
    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${day}. ${month}. ${year} (${hours}:${minutes})`;
    }

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
                    <th>Ordered items</th>
                </thead>
                <tbody>
                    { ordersData.map(order => (
                        <tr>
                            <td>{order.orderDate}</td>
                            <td>{order.orderKey}</td>
                            <td>
                                {order.orderItems.map(item => (
                                    <p>{item.name} ({item.quantity} pieces)</p>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}