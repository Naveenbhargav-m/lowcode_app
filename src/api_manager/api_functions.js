import { ApiClient, AppID } from "./api_clients";

async function GetDataFromAPi(key) {
    let endpoint = `${AppID}/public/${key}`;
    try {
        let response = await ApiClient.get(endpoint);
        return response || [];  // Always return an array
    } catch (error) {
        console.error(`Error fetching data for key "${key}":`, error);
        return [];  // Return empty array instead of breaking the app
    }
}


export {GetDataFromAPi};