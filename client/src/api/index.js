import API from './api';
import HubAPI from './HubAPI';
import ItemAPI from './ItemAPI';
import CategoryAPI from './CategoryAPI';

// the base url should be the origin + "/api"
const baseURL = window.location.origin + '/api';

let baseAPI = new API(baseURL);
let hubAPI = new HubAPI(baseAPI);
let itemAPI = new ItemAPI(baseAPI);
let categoryAPI = new CategoryAPI(baseAPI);

export const api = {
    hub: hubAPI,
    item: itemAPI,
    category: categoryAPI
}

export default api;