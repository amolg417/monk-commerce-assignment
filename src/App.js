import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import ProductListContainer from "./components/ProductListComponents/ProductListContainer";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="h-screen w-full">
        <Navbar />
        <div className="w-full h-[90%] flex items-center justify-center">
          <ProductListContainer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
