import './ItemCard.scss';

const ItemCard = ({ item }) => {
    return <div className="item-card">
        <h2>{item.title}</h2>
        <p>{item.description ?? ""}</p>
    </div>
}

export default ItemCard;