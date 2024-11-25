import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import AppNavigator from "./AppNavigator";
import SplashScreen from "./src/screens/SplashScreen";




const App = () => {

  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = () => {
    setIsSplashVisible(false); // Hide splash screen after timeout
  };

  if (isSplashVisible) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  )
}

export default App;