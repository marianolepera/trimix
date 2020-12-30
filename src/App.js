import "./App.css";
import PersonasListScreen from "./screens/PersonasListScreen";
import ActualizarPersonaScreen from "./screens/ActualizarPersonaScreen";

import { Switch, Route, BrowserRouter } from "react-router-dom";
import Header from "./componentes/Header";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header></Header>
        <div className="container">
          <Switch>
            <Route path="/" exact component={PersonasListScreen}></Route>
            <Route
              path="/persona"
              exact
              component={ActualizarPersonaScreen}
            ></Route>
            <Route
              path="/persona/:id"
              exact
              render={props => <ActualizarPersonaScreen {...props} />}
            ></Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
