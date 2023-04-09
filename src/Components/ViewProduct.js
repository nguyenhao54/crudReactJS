import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";

import {
  faBoxesStacked,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

function ProductInfo({ id }) {
  const [state, setState] = React.useState({
    product: { image },
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
    if (!id) return;
    setState({ status: "pending" });
    fetchProduct(id)
      .then((data) => {
        setState({ product: data, status: "resolved" });
      })
      .catch((error) => {
        setState({ status: "rejected", error });
      });
    // setState({
    //   product: {
    //     id: 6,
    //     title: "MacBook Pro",
    //     description:
    //       "MacBook Pro 2021 with mini-LED display may launch between September, November",
    //     price: 1749,
    //     discountPercentage: 11.02,
    //     rating: 4.57,
    //     stock: 83,
    //     brand: "APPle",
    //     category: "laptops",
    //     thumbnail: "https://dummyjson.com/image/i/products/6/thumbnail.png",
    //     image: 
    //       "https://dummyjson.com/image/i/products/6/2.jpg"
    //   },
    //   status: "resolved",
    // });
  }, [error, id]);
  if (status === "idle") {
    return <div>No id provided</div>;
  } else if (status === "pending") {
    return (
      <div className="flex justify-center items-center h-[500px]">
        <Loading></Loading>
      </div>
    );
  } else if (status === "rejected") {
    throw error;
  } else if (status === "resolved") {
    return (
      <div>
        <img
          className="h-60 flex justify-around"
          src={`${product.image}`}
          alt="Product illustration"
        />
        <div>
          <h4 className="text-xl font-semibold mb-2">{product.title}</h4>
          <p className="mb-2">Description: {product.description}</p>
          <p>
            <FontAwesomeIcon
              icon={faCircleDollarToSlot}
              color="#4f87e3"
              style={{ marginRight: " 10px" }}
            ></FontAwesomeIcon>
            Price: {product.price}$
          </p>
          <p>
            <FontAwesomeIcon
              icon={faBoxesStacked}
              color="#4f87e3"
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
