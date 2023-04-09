import React from "react";
import Button from "./Button";
function Product({ product, onEdit, onDelete, onView }) {
  return (
    <div
      onDoubleClick={() => {
        onView(product.id);
      }}
      className="grid grid-cols-12 gap-3 border-x-2 justify-center items-center px-2 py-1"
    >
      <div
        className="cursor-pointer font-semibold col-span-3"
        onClick={() => {
          onView(product.id);
        }}
      >
        {product.title}
      </div>
      <div className="col-span-2">{product.price + "$"}</div>
      <div className="col-span-1">{product.stock}</div>
      <div className="col-span-2">{product.brand}</div>
      <div className="col-span-2">{product.category}</div>
      <div className="col-span-2">
        <Button
          icon="edit"
          onClick={() => {
            onEdit(product.id);
          }}
        ></Button>
        <Button
          icon="delete"
          color="red"
          onClick={() => {
            onDelete(product.id);
          }}
        ></Button>
      </div>
    </div>
  );
}

export default Product;
