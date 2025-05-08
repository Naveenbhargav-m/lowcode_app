import { signal } from "@preact/signals";
import { APIManager } from "./api_manager";

const PrestDBaseUrl = "http://localhost:8000";
const CreatorBackendUrl = "http://localhost:8001/api";
const AppID = signal("");
const CreatorAPPID = signal("nokodo_creator");

let ApiClient = new APIManager(CreatorBackendUrl, 1000);
let PrestClient = new APIManager(PrestDBaseUrl, 1000);


export{ApiClient, PrestClient, AppID, CreatorAPPID};