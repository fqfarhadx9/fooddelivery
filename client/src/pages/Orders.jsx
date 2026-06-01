import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getOrders } from "../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("food-app-token");
        await getOrders(token).then((res) => setOrders(res.data.data) || []);
      } catch (err) {
        console.log("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <Loader>Loading your orders...</Loader>;
  }

  return (
    <Container>
      <Title>My Orders</Title>

      {orders?.length === 0 ? (
        <Empty>No orders found 😢</Empty>
      ) : (
        <OrdersWrapper>
          {orders?.map((order) => (
            <OrderCard key={order._id}>
              <TopRow>
                <OrderId>Order #{order._id.slice(-6)}</OrderId>
                <Status status={order.status}>{order.status}</Status>
              </TopRow>

              <Info>
                <div>
                  <Label>Name:</Label> {order.user?.name}
                </div>

                <div>
                  <Label>Date:</Label>{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>

                 <div>
                  <Label>Address:</Label> {order.address}
                </div>

              </Info>

              <Items>
                {order.products.map((item, idx) => (
                  <Item key={idx}>
                     🍽 {item.product?.name} × {item.quantity}
                  </Item>
                ))}

                <div>
                  <Label>Total:</Label> ${order.total_amount}
                </div>
              </Items>
            </OrderCard>
          ))}
        </OrdersWrapper>
      )}
    </Container>
  );
};

export default Orders;

/* ---------------- STYLED COMPONENTS ---------------- */

const Container = styled.div`
  padding: 30px;
  max-width: 1100px;
  margin: auto;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
`;

const Loader = styled.div`
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const Empty = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 18px;
  color: gray;
`;

const OrdersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OrderCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const OrderId = styled.div`
  font-weight: 600;
`;

const Status = styled.span`
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  color: #fff;

  background: ${({ status }) =>
    status === "Delivered"
      ? "green"
      : status === "Pending"
      ? "orange"
      : "gray"};
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin: 10px 0;
  flex-wrap: wrap;
  gap: 10px;
`;

const Label = styled.span`
  font-weight: 600;
`;

const Items = styled.div`
  margin-top: 10px;
`;

const Item = styled.div`
  font-size: 14px;
  padding: 3px 0;
`;