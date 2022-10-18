import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

import {
  faBoxesStacked,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";

function ProductInfo({ id }) {
  const [state, setState] = React.useState({
    product: { images: [] },
    error: null,
    status: id ? "pending" : "idle",
  });
  const fetchProduct = async (id) => {
    const res = await fetch(`http://localhost:5000/products/${id}`);
    const data = await res.json();
    // if (data === {}) {
    //   const error = { message: `There is no Product with id ${id}` };
    //   return Promise.reject(error);
    // }
    // console.log(data);
    return data;
  };
  const { status, product, error } = state;
  useEffect(() => {
    // const getProduct = async () => {
    //   const productFromServer = await fetchProduct(id);
    // //   if(!productFromServer) throw error;
    //   setProduct(productFromServer);
    // };
    // getProduct();
    if (!id) return;
    setState({ status: "pending" });
    fetchProduct(id)
      .then((data) => {
        setState({ product: data, status: "resolved" });
      })
      .catch((error) => {
        setState({ status: "rejected", error });
      });
  }, [error, id]);
  if (status === "idle") {
    return <div>No id provided</div>;
  } else if (status === "pending") {
    return <div>Pending</div>;
  } else if (status === "rejected") {
    throw error;
  } else if (status === "resolved") {
    return (
      <div className="displayFlex">
        <img
          className="displayImage"
          src={`${product.images[1]}`}
          alt="Product illustration"
        />
        <div className="productInfo">
          <h4>{product.title}</h4>
          <p>Description: {product.description}</p>
          <p>
            <FontAwesomeIcon
              icon={faCircleDollarToSlot}
              color="green"
              style={{ marginRight: " 10px" }}
            ></FontAwesomeIcon>
            Price: {product.price}$
          </p>
          <p>
            <FontAwesomeIcon
              icon={faBoxesStacked}
              color="green"
              style={{ marginRight: "10px" }}
            ></FontAwesomeIcon>
            Stock: {product.stock}
          </p>
        </div>
      </div>
    );
  }
}
function ErrorFallback({ error }) {
  return (
    <div role="alert">
      There was an error:{" "}
      <pre style={{ color: "red", margin: "12px" }}>{error.message}</pre>
    </div>
  );
}
function ViewProduct() {
  // console.log(product);
  let { id } = useParams();
  return (
    <>
      <h3 className="heading-third">Product Detail</h3>
      <ErrorBoundary key={id} FallbackComponent={ErrorFallback}>
        <ProductInfo id={id}></ProductInfo>
      </ErrorBoundary>
    </>
  );
}

export default ViewProduct;
