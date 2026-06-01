import React, { useState } from "react";
import styled from "styled-components";
import { addProducts } from "../api";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);   /* 🔥 background blur */
  z-index: 999;
`;

const ModalBox = styled.div`
  width: 400px;
  background: #fff;
  padding: 25px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);

  animation: pop 0.2s ease-in-out;

  @keyframes pop {
    from {
      transform: scale(0.8);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  input {
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #ddd;
    outline: none;
    
  }
    
  input:focus {
   border: 1px solid #ff2e63;
  }

  button {
    padding: 10px;
    border: none;
    border-radius: 10px;
    background: #ff2e63;
    color: white;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;
  }

  button:hover {
    background: #e61e56;
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 12px;
  font-size: 18px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: red;
  }
`;

const AddProductModal = ({ setOpenModal }) => {
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    img: "",
    org: "",   // selling price
    mrp: "",   // original price
    ingredients: "",
    category: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const org = Number(product.org);
    const mrp = Number(product.mrp);

    const off = mrp ? ((mrp - org) / mrp) * 100 : 0;

    const payload = [
      {
        name: product.name,
        desc: product.desc,
        img: product.img,
        category: product.category,

        ingredients: product.ingredients
          .split(",")
          .map((item) => item.trim()),

        price: {
          org,
          mrp,
          off: Math.round(off),
        },
      },
    ];

    try {
      await addProducts(payload);

      alert("Product Added");
      setOpenModal(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ModalOverlay>
        <ModalBox>
        <CloseButton onClick={() => setOpenModal(false)}>✖</CloseButton>

        <h2>Add Product</h2>

        <input name="name" placeholder="Product Name" onChange={handleChange} />
        <input name="desc" placeholder="Description" onChange={handleChange} />
        <input name="img" placeholder="Image URL" onChange={handleChange} />

        <input name="org" placeholder="Selling Price (org)" onChange={handleChange} />
        <input name="mrp" placeholder="MRP Price" onChange={handleChange} />

        <input
            name="ingredients"
            placeholder="Ingredients comma separated"
            onChange={handleChange}
        />

        <input name="category" placeholder="Category" onChange={handleChange} />

        <button onClick={handleSubmit}>Add Product</button>
        </ModalBox>
    </ModalOverlay>
 );
};

export default AddProductModal;