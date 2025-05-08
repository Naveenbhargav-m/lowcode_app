import { signal } from "@preact/signals";
import { CreatorAPPID, PrestClient } from "../api_manager/api_clients";

const apps = signal([]);

async function GetAppsfromDB() {
  let myclient = PrestClient;
  let url = `${CreatorAPPID}/public/apps`;
  let response = await myclient.get(url);

  apps.value = [...response];
}


export {GetAppsfromDB, apps};