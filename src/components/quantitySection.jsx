import { useState } from "react";

export default function AddToCart({ handleAddToCart, itemId}) {
    const [quantity, setQuantity] = useState(1);

    function decrementQuantity() {
        setQuantity(prevQuantity => prevQuantity - 1);
    }

    function incrementQuantity() {
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    function changeQuantity(e) {
        setQuantity(parseInt(e.target.value));
    }

    return (
        <div className="add-to-cart-section">
            <button onClick={decrementQuantity}>-</button>
            <input type="number" value={quantity} onChange={changeQuantity}/>
            <button onClick={incrementQuantity}>+</button>
            <button onClick={() => handleAddToCart(itemId, quantity)}>Add To Cart</button>
        </div>
    )
}