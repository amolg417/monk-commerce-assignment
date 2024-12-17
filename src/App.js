import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import ProductListContainer from "./components/ProductListComponents/ProductListContainer";
import store from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="w-full min-h-full">
        <Navbar />
        <div className="w-full min-h-full flex items-center justify-center">
          <ProductListContainer />
        </div>
      </div>
    </Provider>
  );
}

export default App;
