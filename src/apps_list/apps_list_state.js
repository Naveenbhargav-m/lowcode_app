import { signal } from "@preact/signals";
import { ApiClient, CreatorAPPID } from "../api_manager/api_clients";

const apps = signal([]);

async function GetAppsfromDB() {
  let myclient = ApiClient;
  let url = `${CreatorAPPID}/public/apps`;
  let response = await myclient.get(url);

  apps.value = [...response];
}


export {GetAppsfromDB, apps};