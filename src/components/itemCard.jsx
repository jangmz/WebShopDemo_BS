export default function ItemCard({ item }) {
    return (
        <div className="item-card">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            
        </div>
    )
}