import React from "react";
import Product from "./Product";
import DetailProduct from "../Components/DetailProduct";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
function Products({ products, setProducts }) {
  console.log(products);
  console.log("products render");
  let navigate = useNavigate();
  const [showDetail, setShowDetail] = React.useState(false);
  const [productDetail, setProductDetail] = React.useState(products[1]);
  const [isDetail, setIsDetail] = React.useState(true);
  const editProduct = async (id) => {
    setShowDetail(true);
    setIsDetail(true);
    setProductDetail(products.find((product) => product.id === id));
    // console.log(id);
  };
  const deleteProduct = async (id) => {
    // console.log(id);
    await fetch(`http://localhost:5000/products/${id}`, {
      method: "DELETE",
    });
    setProducts(products.filter((product) => product.id !== id));
  };
  const viewProduct = async (id) => {
    // console.log(id);
    navigate(`/products/${id}`);
  };
  const saveProduct = async (product) => {
    const res = await fetch(`http://localhost:5000/products/${product.id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    setProducts(products.map((p) => (p.id === product.id ? data : p)));
    setShowDetail(!showDetail);
  };
  function onAdd() {
    setProductDetail({});
    setShowDetail(!showDetail);
    setIsDetail(false);
  }
  const addProduct = async (product) => {
    const res = await fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const data = await res.json();
    console.log(data);
    setProducts([...products, data]);
    setShowDetail(!showDetail);
  };

  return (
    <>
      {showDetail ? (
        <DetailProduct
          isDetail={isDetail}
          product={productDetail}
          showDetail={showDetail}
          onShowDetail={() => setShowDetail(!showDetail)}
          onSave={saveProduct}
          onAdd={addProduct}
        ></DetailProduct>
      ) : null}

      <div className="displayFlex">
        <h3 className=" heading-third"> Product Management</h3>
        <Button text="Add Product" onClick={onAdd}></Button>
      </div>
      <div className="scroll">
        <table className="table">
          <thead>
            <tr>
              <th className="td">Title</th>
              <th className="td">Price</th>
              <th className="td">Stock</th>
              <th className="td">Brand</th>
              <th className="td">Category</th>
              <th className="td">Action</th>
            </tr>
          </thead>
          <tbody className="scroll">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                onEdit={editProduct}
                onDelete={deleteProduct}
                onView={viewProduct}
              ></Product>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Products;
