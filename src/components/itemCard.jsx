import QuantitySection from "./quantitySection";

export default function ItemCard({ item, handleAddToCart}) {
    
    return (
        <div className="item-card">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Available items: {item.amount}</p>
            <QuantitySection 
                handleAddToCart={handleAddToCart}
                itemId={item.id}
            />
        </div>
    )
}