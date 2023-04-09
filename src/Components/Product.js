import React from "react";
import Button from "./Button";
function Product({ product, onEdit, onDelete, onView }) {
  return (
    <tr
      onDoubleClick={() => {
        onView(product.id);
      }}
    >
      <td
        className="td cursor-pointer font-semibold"
        onClick={() => {
          onView(product.id);
        }}
      >
        {product.title}
      </td>
      <td className="td">{product.price + "$"}</td>
      <td className="td">{product.stock}</td>
      <td className="td">{product.brand}</td>
      <td className="td">{product.category}</td>
      <td className="td">
        <Button
          icon="edit"
          onClick={() => {
            //console.log("click");
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
      </td>
    </tr>
  );
}

export default Product;
