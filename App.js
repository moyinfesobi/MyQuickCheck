import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import AppNavigator from "./AppNavigator";


const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

export default App;