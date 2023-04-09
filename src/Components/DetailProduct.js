import React from "react";
import Button from "./Button";

function DetailProduct({ product, onShowDetail, onSave, isDetail, onAdd }) {
  const [detail, setDetail] = React.useState(product);
  // console.log(product);
  const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    image,
  } = detail;
  // console.log(detail);
  function handleInputChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const inputName = target.name;
    //  console.log(inputName);
    setDetail((detail) => ({ ...detail, [inputName]: value }));
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(detail);
    if (isDetail) onSave(detail);
    else onAdd(detail);
  }
  return (
    <div className="overlay">
      <form className="form-container" onSubmit={handleSubmit}>
        <h3 className="heading-third"> Product Detail</h3>
        <div className="form-content">
          <div className="form-control">
            <label>Title</label>
            <input
              type="text"
              placeholder="Add Title"
              value={title}
              name="title"
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className="form-control">
            <label>Description</label>
            <input
              type="text"
              placeholder="Add Description"
              value={description}
              name="description"
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className="form-control">
            <label>Price</label>
            <input
              type="text"
              name="price"
              placeholder="Add Price"
              value={price}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className="form-control">
            <label>Discount Percentage</label>
            <input
              type="text"
              name="discountPercentage"
              placeholder="Add DiscountPercentage"
              value={discountPercentage}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className="form-control">
            <label>Rating</label>
            <input
              type="text"
              name="rating"
              placeholder="Add Rating"
              value={rating}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className="form-control">
            <label>Stock</label>
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={stock}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className="form-control">
            <label> Brand</label>
            <input
              type="text"
              name="brand"
              placeholder="Add brand"
              value={brand}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className="form-control">
            <label> Category</label>
            <input
              type="text"
              name="category"
              placeholder="Add category"
              value={category}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className="form-control">
            <label> Thumbnail</label>
            <input
              type="text"
              name="thumbnail"
              placeholder="Add Thumbnail"
              value={thumbnail}
              onChange={(e) => handleInputChange(e)}
            ></input>
          </div>
          <div className="form-control">
            <label> Image</label>
              <input
                type="text"
                name="image"
                placeholder="Add images"
                value={image}
                onChange={(e) => handleInputChange(e)}
              ></input>
          </div>
        </div>
        <div className="form-footer">
          <Button type="submit" text={isDetail ? "Save" : "Add"}></Button>
          <Button text="Cancel" color="red" onClick={onShowDetail}></Button>
        </div>
      </form>
    </div>
  );
}

export default DetailProduct;
