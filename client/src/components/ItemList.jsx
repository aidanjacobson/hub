import { useHubData } from '../context/HubDataContext';
import ItemCard from './ItemCard'; // Assuming you have an ItemCard component to display each item

import './ItemList.scss';

const ItemList = ({ name, items }) => {
    return <fieldset className="item-list">
        <legend>{name}</legend>
        {items.map((item, i) => (<ItemCard key={i} item={item} />)) }
    </fieldset>
}

export default ItemList;