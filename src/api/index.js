
const api = "https://crud-react-app-for-itss.onrender.com/products";

  export const fetchProduct = async (id) => {
    const res = await fetch(`${api}/${id}`);
    return await res.json();
};
  

export  const fetchProducts = async () => {
  const res = await fetch(api);
  return await res.json();
};

export const add = async ( product ) =>
{
    const res = await fetch(api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return await res.json();
}

export const deleteP = async (id) => {
  const res= await fetch(`${api}/${id}`, {
    method: "DELETE",
  } );
    return res.json();
};


export const updateP = async ( p ) => {
    const res = await fetch(`${api}/${p.id}`, {
      method: "PUT" /* or PATCH */,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(p),
    });
    return await res.json();
}