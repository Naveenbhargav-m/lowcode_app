import { useEffect, useState } from "preact/hooks";
import { GetScreensFromDB, screenFetchSignal, screens, SetActiveScreen } from "./screen_list";
import { Loader2, Monitor } from "lucide-react";
import { useLocation } from "preact-iso";


// Reusable Loading Component
function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center h-40">
        <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
      </div>
    );
  }
  
  // Reusable Screen Item Component
  function ScreenItem({ screen, onClick }) {
    return (
      <li 
        className="hover:bg-blue-50 transition-colors duration-150 cursor-pointer"
        onClick={() => onClick(screen)}
      >
        <div className="p-4 flex items-center">
          <div className="bg-blue-100 p-2 rounded-lg mr-4">
            <Monitor className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">{screen.name}</h3>
          </div>
        </div>
      </li>
    );
  }
  
  // Reusable Screen List Container Component
  function ScreenListContainer({ children }) {
    return (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
        <ul className="divide-y divide-gray-100">
          {children}
        </ul>
      </div>
    );
  }
  
  // Main Component
  function ScreenList() {
    const [nameObjs, setNameObjs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let location = useLocation();
  
    useEffect(() => {
      GetScreensFromDB();
    }, []);


    useEffect(() => {
      let nameObjs = [];
      let keys = Object.keys(screens);
      for (let i = 0; i < keys.length; i++) {
        let curKey = keys[i];
        let curScreen = screens[curKey];
        console.log("current Screen:",curScreen);
        let temp = {};
        temp["id"] = curScreen["id"];
        temp["name"] = curScreen["name"];
        nameObjs.push(temp);
      }
      setNameObjs(nameObjs);
      setIsLoading(false);
    }, [screenFetchSignal.value]);
  
    // Handle screen selection
    const handleSelectScreen = (screen) => {
      console.log("Selected screen:", screen);
      SetActiveScreen(screen["id"]);
      location.route("/view");
      // You can implement selection logic here
    };
  
    return (
      <div className="p-4" style={{"color": "black"}}>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Available Screens</h2>
        </div>
  
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <ScreenListContainer>
            {nameObjs.map((screen) => (
              <ScreenItem 
                key={screen.id} 
                screen={screen} 
                onClick={handleSelectScreen} 
              />
            ))}
          </ScreenListContainer>
        )}
      </div>
    );
  }
  
  export { ScreenList};
  