import { useLocation } from "preact-iso";
import { useEffect } from "preact/hooks";
import {GetAppsfromDB,apps} from "./apps_list_state";
import { AppID } from "../api_manager/api_clients";
export function AppList() {
    useEffect((()=>{
      GetAppsfromDB();
    }),[]);
    let router = useLocation();
    return(
      <div class="app-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={{height:"85vh"}}>
        {apps.value.length > 0 ? (
          apps.value.map((app) => (
            <div
              key={app.id}
              class="w-40 h-40 border border-white shadow-md rounded-lg flex justify-center items-center bg-white"
              onClick={()=> {
                  let newappname = app["gen_name"];
                  localStorage.setItem("db_name",newappname);
                  AppID.value = newappname;
                //   sideBarEnable.value = true;
                  router.route("/home");
                 }}
            >
              <span class="text-center font-medium text-black">{app.name}</span>
            </div>
          ))
        ) : (
          <div class="w-full text-center col-span-full">
            <p>No apps created yet.</p>
          </div>
        )}
      </div>
    );
  }
    
    