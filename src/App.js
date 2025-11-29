import "./App.css";
import ProductList from "./Grocerypages/ProductList";
import Cart from "./Grocerypages/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <div className="d-flex justify-content-between flex-wrap">
        <ProductList />
        <Cart />
      </div>
    </div>
  );
}

export default App;
