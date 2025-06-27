import './ItemCard.scss';
import { Link } from 'react-router-dom';

const EditButton = ({ item }) => {
    return (
        <Link to={`/edit/${item.id}`} className="edit-button" title="Edit Item">
            ✎
        </Link>
    )
}

const ItemCard = ({ item }) => {
    return (
        <a href={item.url} target="_blank" rel="noopener noreferrer" className="item-card-link">
            <div className="item-card">
                <EditButton item={item} />
                <h2>{item.title}</h2>
                <p>{item.description ?? ""}</p>
            </div>
        </a>
    )
}

export default ItemCard;