import { Provider } from "react-redux";
import Body from "./componets/Body";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}

export default App;

//Wraps your entire app with global providers like redux store provider,theme provider etc.
