import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api";

import {
  faBoxesStacked,
  faCircleDollarToSlot,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "./Loading";

function ProductInfo({ id }) {
  const [state, setState] = React.useState({
    product: { image: "" },
    error: null,
    status: id ? "pending" : "idle",
  });

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
          className="h-60 flex justify-around p-4"
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
