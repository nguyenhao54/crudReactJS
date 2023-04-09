import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
//import AboutPage from "./pages/AboutPage";
import Header from "./Components/Header";
import Products from "./Components/Products";
import ViewProduct from "./Components/ViewProduct";
import Loading from "./Components/Loading";
const LazyAbout = React.lazy(() => import("./pages/AboutPage"));
function App()
{
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  useEffect( () =>
  {
    setLoading( true );
    fetchProducts().then( ( res ) =>
    {
       setProducts(res);
    }).finally(()=>{  setLoading( false )});
  }, [] );
  
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
                  loading={loading}
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
              <React.Suspense
                fallback={
                  <div className="flex justify-center items-center h-[500px]">
                    <Loading></Loading>
                  </div>
                }
              >
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
