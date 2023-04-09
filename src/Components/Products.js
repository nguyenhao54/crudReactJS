import React, { useEffect } from "react";
import Product from "./Product";
import DetailProduct from "../Components/DetailProduct";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import SearchInput from "./SearchInput";
import Loading from "./Loading";
import { add, deleteP, updateP } from "../api";
function Products({ products, setProducts, loading }) {
  let navigate = useNavigate();
  const [showDetail, setShowDetail] = React.useState(false);
  const searchInput = React.createRef();
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [productDetail, setProductDetail] = React.useState(products[1]);
  const [isDetail, setIsDetail] = React.useState(true);
  const [filteredList, setFilteredList] = React.useState(products);
  const editProduct = async (id) => {
    setShowDetail(true);
    setIsDetail(true);
    setProductDetail(products.find((product) => product.id === id));
  };
  const deleteProduct = async (id) => {
    const res = await deleteP(id);
    setProducts(products.filter((product) => product.id !== id));
  };
  const viewProduct = async (id) => {
    navigate(`/products/${id}`);
  };
  const saveProduct = async (product) => {
    const data = await updateP( product );
    setProducts(products.map((p) => (p.id === product.id ? data : p)));
    setShowDetail(!showDetail);
  };
  function onAdd() {
    setProductDetail({});
    setShowDetail(!showDetail);
    setIsDetail(false);
  }
  const addProduct = async (product) => {
    const res = await add(product);
    setProducts([...products, res]);
    setShowDetail(!showDetail);
  };
  useEffect(() => {
    if (isEmpty) setFilteredList(products);
  }, [isEmpty, products]);
  const onSearch = (e) => {
    e.preventDefault();
    if (searchInput.current.value);
    setFilteredList(
      products.filter((p) =>
        p.title.toLowerCase().includes(searchInput.current.value.toLowerCase())
      )
    );
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
      <h3 className=" heading-third"> Product Management</h3>
      <div className="flex items-center gap-10 justify-center">
        <SearchInput
          ref={searchInput}
          onSearch={onSearch}
          setIsEmpty={setIsEmpty}
        ></SearchInput>
        <Button text="Add Product" onClick={onAdd}></Button>
      </div>
      <div className="">
        <div className="relative w-[900px] m-auto">
          <div className="absolute bg-neutral-300  left-0 top-0 justify-center items-center">
            <div className="grid grid-cols-12 gap-3 h-12 justify-center items-center border-2 px-2 py-1 w-[900px]">
              <div className="col-span-3">Title</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-1">Stock</div>
              <div className="col-span-2">Brand</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-1">Action</div>
            </div>
          </div>
          <div className="pt-12 max-w-[900px] max-h-[400px] overflow-y-scroll">
            {loading ? (
              <div className="flex justify-center items-center h-[300px]">
                <Loading></Loading>
              </div>
            ) : (
              <div>
                {filteredList.length > 0 ? (
                  filteredList.map((product) => (
                    <Product
                      key={product.id}
                      product={product}
                      onEdit={editProduct}
                      onDelete={deleteProduct}
                      onView={viewProduct}
                    ></Product>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-[200px]">
                    No Items available
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
