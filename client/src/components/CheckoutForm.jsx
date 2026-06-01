import React from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Label = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

const Row = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;

  padding: 12px;

  border-radius: 10px;
  border: 1px solid #ddd;

  outline: none;

  &:focus {
    border: 1px solid #ff2e63;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box;

  padding: 12px;

  border-radius: 10px;
  border: 1px solid #ddd;

  resize: none;
  outline: none;

  &:focus {
    border: 1px solid #ff2e63;
  }
`;

const PaymentOption = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;

  cursor: pointer;
`;

const CheckoutForm = ({
  deliveryDetails,
  setDeliveryDetails,

  paymentMethod,
  setPaymentMethod,

  cardDetails,
  setCardDetails,

  quantity,
  setQuantity,
}) => {

  return (
    <>
      <Section>

        <Label>Delivery Details</Label>

        <Row>

          <Input
            placeholder="First Name"
            value={deliveryDetails.firstName}
            onChange={(e) =>
              setDeliveryDetails({
                ...deliveryDetails,
                firstName: e.target.value,
              })
            }
          />

          <Input
            placeholder="Last Name"
            value={deliveryDetails.lastName}
            onChange={(e) =>
              setDeliveryDetails({
                ...deliveryDetails,
                lastName: e.target.value,
              })
            }
          />

        </Row>

        <Input
          placeholder="Email Address"
          value={deliveryDetails.emailAddress}
          onChange={(e) =>
            setDeliveryDetails({
              ...deliveryDetails,
              emailAddress: e.target.value,
            })
          }
        />

        <Input
          placeholder="Phone Number"
          value={deliveryDetails.phoneNumber}
          onChange={(e) =>
            setDeliveryDetails({
              ...deliveryDetails,
              phoneNumber: e.target.value,
            })
          }
        />

        <TextArea
          rows="4"
          placeholder="Complete Address"
          value={deliveryDetails.completeAddress}
          onChange={(e) =>
            setDeliveryDetails({
              ...deliveryDetails,
              completeAddress: e.target.value,
            })
          }
        />

        {quantity !== undefined && (
          <Input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        )}

      </Section>

      <Section>

        <Label>Payment Method</Label>

        <PaymentOption>

          <input
            type="radio"
            checked={paymentMethod === "cod"}
            onChange={() => setPaymentMethod("cod")}
          />

          Cash On Delivery

        </PaymentOption>

        <PaymentOption>

          <input
            type="radio"
            checked={paymentMethod === "card"}
            onChange={() => setPaymentMethod("card")}
          />

          Debit / Credit Card

        </PaymentOption>

        {paymentMethod === "card" && (
          <>

            <Input
              placeholder="Card Number"
              value={cardDetails.cardNumber}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  cardNumber: e.target.value,
                })
              }
            />

            <Row>

              <Input
                placeholder="Expiry Date"
                value={cardDetails.expiryDate}
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    expiryDate: e.target.value,
                  })
                }
              />

              <Input
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    cvv: e.target.value,
                  })
                }
              />

            </Row>

            <Input
              placeholder="Card Holder Name"
              value={cardDetails.cardHolder}
              onChange={(e) =>
                setCardDetails({
                  ...cardDetails,
                  cardHolder: e.target.value,
                })
              }
            />

          </>
        )}

      </Section>

    </>
  );
};

export default CheckoutForm;