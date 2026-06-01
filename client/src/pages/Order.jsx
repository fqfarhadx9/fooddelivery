import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { getProductDetails, placeOrder } from "../api";
import { CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../redux/reducers/SnackbarSlice";
import CheckoutForm from "../components/CheckoutForm";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  padding: 20px 30px;
  padding-bottom: 200px;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    padding: 20px 12px;
  }
  background: ${({ theme }) => theme.bg};
`;
const Section = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  gap: 28px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 32px;
  width: 100%;
  padding: 12px;
  @media (max-width: 750px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 750px) {
    flex: 1.2;
  }

  @media (max-width: 600px) {
    .table-header {
      display: none;
    }
  }
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  align-items: center;
  gap: 20px;

  ${({ head }) => head && `margin-bottom: 22px;`}

  @media (max-width: 600px) {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
`;

const TableItem = styled.div`
  display: flex;
  align-items: center;

  ${({ bold }) =>
    bold &&
    `
      font-weight: 600;
      font-size: 18px;
    `}
`;

const Counter = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.text_secondary + 40};
  border-radius: 8px;
  padding: 4px 12px;
`;

const Product = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  width: 100%;
`;
const Img = styled.img`
  width: 90px;
  height: 90px;
  object-fit: cover;
  border-radius: 10px;
`;
const Details = styled.div`
  max-width: 130px;

  @media (max-width: 700px) {
    max-width: 60px;
  }
`;
const Protitle = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 16px;
  font-weight: 500;
`;
const ProDesc = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 750px) {
    flex: 0.8;
  }
`;

const Order = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [buttonLoad, setButtonLoad] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    phoneNumber: "",
    completeAddress: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolder: "",
  });

  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    await getProductDetails(id).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const convertAddressToString = (addressObj) => {
    // Convert the address object to a string representation
    return `${addressObj.firstName} ${addressObj.lastName}, ${addressObj.completeAddress}, ${addressObj.phoneNumber}, ${addressObj.emailAddress}`;
  };

  const PlaceOrder = async () => {
    setButtonLoad(true);

    try {
      const isDeliveryDetailsFilled =
        deliveryDetails.firstName &&
        deliveryDetails.lastName &&
        deliveryDetails.completeAddress &&
        deliveryDetails.phoneNumber &&
        deliveryDetails.emailAddress;

      if (!isDeliveryDetailsFilled) {
        dispatch(
          openSnackbar({
            message: "Please fill in all required delivery details.",
            severity: "error",
          })
        );
        setButtonLoad(false);
        return;
      }

      const token = localStorage.getItem("food-app-token");

      const orderDetails = {
        products: [
          {
            product: product._id,
            quantity: quantity,
          },
        ],
        address: convertAddressToString(deliveryDetails),
        total_amount: Number((quantity * product?.price?.org).toFixed(2)),
      };

      await placeOrder(token, orderDetails);

      dispatch(
        openSnackbar({
          message: "Order placed successfully",
          severity: "success",
        })
      );

      setDeliveryDetails({
        firstName: "",
        lastName: "",
        emailAddress: "",
        phoneNumber: "",
        completeAddress: "",
      });

      setCardDetails({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardHolder: "",
      });

      setPaymentMethod("cod");
      setReload(!reload);
      navigate("/orders");

    } catch (err) {
      dispatch(
        openSnackbar({
          message: "Failed to place order. Please try again.",
          severity: "error",
        })
      );
    } finally {
      setButtonLoad(false);
    }
  };

  useEffect(() => {
    console.log("Order component mounted");
    getProducts();
  }, [reload]);

  return (
    <Container>
      <Section>
        <Title>Product Details</Title>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Wrapper>
                <Left>
                  <Table head className="table-header">
                    <TableItem flex>
                        Product
                    </TableItem>
                    <TableItem bold>Price</TableItem>
                    <TableItem bold>Quantity</TableItem>
                    <TableItem bold>Subtotal</TableItem>
                    <TableItem></TableItem>
                  </Table>
                  {product &&  (
                    <Table>
                      <TableItem flex>
                        <Product>
                            <Img src={product?.img} />
                            <Details>
                            <Protitle>{product?.name}</Protitle>
                            <ProDesc>{product?.desc}</ProDesc>
                            </Details>
                        </Product>
                      </TableItem>
                      <TableItem>
                         ${product?.price?.org}
                      </TableItem>
                      <TableItem>
                        <Counter>
                          <div
                            style={{
                              cursor: "pointer",
                              flex: 1,
                              textAlign: "center",
                            }}
                            onClick={decreaseQuantity}
                          >
                            -
                          </div>

                          {quantity}

                          <div
                            style={{
                              cursor: "pointer",
                              flex: 1,
                              textAlign: "center",
                            }}
                            onClick={increaseQuantity}
                          >
                            +
                          </div>
                        </Counter>
                      </TableItem>
                      <TableItem>
                      $ {(quantity * product?.price?.org).toFixed(2)}
                      </TableItem>
                        
                    </Table>
                  )}
                </Left>
                <Right>
                    <CheckoutForm
                    deliveryDetails={deliveryDetails}
                    setDeliveryDetails={setDeliveryDetails}

                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}

                    cardDetails={cardDetails}
                    setCardDetails={setCardDetails}
                    />
                    <Button
                    text="Pace Order"
                    small
                    onClick={PlaceOrder}
                    isLoading={buttonLoad}
                    isDisabled={buttonLoad}
                    />
                </Right>
            </Wrapper>
          </>
        )}
      </Section>
    </Container>
  );
};

export default Order;
