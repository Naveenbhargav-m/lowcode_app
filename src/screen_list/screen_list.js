import { signal } from "@preact/signals";
import { generateUID } from "../utils/helpers";
import { GetDataFromAPi } from "../api_manager/api_functions";
import { ActiveScreen } from "../state/screen_state";

let screens = {};
let curScreen = {};
let screenFetchSignal = signal("");
function GetScreensFromDB() {
    GetDataFromAPi("_screens").then((myscreens) => {
        console.log("my screens:", myscreens);
  
        if (!myscreens || myscreens.length === 0) {
            console.log("my screens is null:", myscreens);
            screens = {};
            return;
        }
  
        let tempnames = [];
        let screensmap = {};
  
        for (let i = 0; i < myscreens.length; i++) {
            let curScreen = myscreens[i];
            let curname = curScreen["screen_name"];
            screensmap[curScreen["id"]] = { ...curScreen["configs"],"id": curScreen["id"], "name": curname };

        }
        
        screenFetchSignal.value = generateUID();
        console.log("my screens is finally:", myscreens);
        screens = screensmap;
    }).catch(error => {
        console.error("Error loading screens:", error);
    });
}

function SetActiveScreen(screen_id) {
    let curScreen = screens[screen_id];
    ActiveScreen.value = {...curScreen};
    console.log("current screen and active screen:",curScreen, ActiveScreen.value, screen_id);
} 
export {GetScreensFromDB, screenFetchSignal, screens, curScreen, SetActiveScreen};