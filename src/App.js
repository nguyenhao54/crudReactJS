import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
//import AboutPage from "./pages/AboutPage";
import Header from "./Components/Header";
import Products from "./Components/Products";
import ViewProduct from "./Components/ViewProduct";
const LazyAbout = React.lazy(() => import("./pages/AboutPage"));
function App() {
  const [products, setProducts] = React.useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const productsFromServer = await fetchProducts();
      setProducts(productsFromServer);
    };
    getProducts();
  }, []);


 
  const fetchProducts = async () => {
    const res = await fetch("http://localhost:5000/products");
    
    const data = await res.json();
    return data;
  };


  return (
    <Router>
      <div>
        <Header></Header>
      

        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route
              path=""
              element={
                <Products
                  products={products}
                  setProducts={setProducts}
                ></Products>
              }
            ></Route>
            <Route
              path="products/:id"
              element={<ViewProduct></ViewProduct>}
            ></Route>
          </Route>
          <Route
            path="/about"
            element={
              <React.Suspense fallback={<div className="page">Loading...</div>}>
                <LazyAbout></LazyAbout>
              </React.Suspense>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
