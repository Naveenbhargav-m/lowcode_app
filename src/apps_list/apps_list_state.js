import { signal } from "@preact/signals";


let apps = signal([]);

function GetAppsFromDB() {

}

export {GetAppsFromDB, apps};