import React, { useState } from "react";
import { Modal } from "@mui/material";
import styled from "styled-components";
import { Close } from "@mui/icons-material";

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

const OrderModal = ({ open, setOpen,  onPlaceOrder, product }) => {
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");

  const handleOrder = () => {
    let qty = Number(quantity);
    let price = Number(product?.price?.org || 0);
    const total_amount = price * qty;

   const formData = {
      name,
      address,
      total_amount,
      products: [
        {
          product: product._id,
          quantity: qty,
        },
      ],
    };
    console.log("FORM DATA:", formData);

    onPlaceOrder(formData);

    setOpen(false);
  };

  if (!open) return null;

  return (
    <ModalOverlay>
        <ModalBox>
        <CloseButton onClick={() => setOpen(false)}>✖</CloseButton>

        <h2>Place Order</h2>

        <input
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            />

            <input
            name="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />

            <input
            name="quantity"
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            />

        <button onClick={handleOrder}>Confirm Order</button>
        </ModalBox>
    </ModalOverlay>
 );
};

export default OrderModal;