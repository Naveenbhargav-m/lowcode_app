import { render } from "preact";
  import { LocationProvider, Router, Route, useLocation } from "preact-iso";
import "./index.css";
import { NotFoundComponent } from "./general_components/not_found";
import { AppList } from "./apps_list/apps_list";
import { ScreenList } from "./screen_list/screens_page";
import { ScreenpageRenderer } from "./screen_renderer/screen_page_renderer";


export function App() {

  return (
    <LocationProvider>
   <div className="flex bg-white" style={{height:"100vh"}}>
      <main className="flex-grow bg-white">
        <Router>
          <Route path="/" component={AppList}/>
          <Route path="/screens" component={ScreenList}/>
          <Route path="/home" component={ScreenList} />
          <Route path="/view/:id" component={ScreenpageRenderer} />
          <Route default component={NotFoundComponent} />

        </Router>
      </main>
</div>

    </LocationProvider>
  );
}

render(<App />, document.getElementById("app"));
