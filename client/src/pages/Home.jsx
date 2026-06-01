import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { category } from "../utils/data";
import HeaderImage from "../utils/Images/Header.png";
import ProductCategoryCard from "../components/cards/ProductCategoryCard";
import ProductsCard from "../components/cards/ProductsCard";
import { getAllProducts} from "../api";
import { CircularProgress } from "@mui/material";
import AddProductModal from "../components/AddProductsModal";
import CloseIcon from "@mui/icons-material/Close";

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
  max-width: 1400px;
  padding: 32px 16px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;
const Img = styled.img`
  width: 100%;
  max-width: 1200px;
`;
const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  display: flex;
  justify-content: ${({ center }) => (center ? "center" : "space-between")};
  align-items: center;
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  justify-content: center;
  @media (max-width: 760px) {
    gap: 16px;
  }
`;

const AddButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 12px;

  background: #ff2e63;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  transition: 0.3s ease;

  &:hover {
    background: #e61e56;
  }

  @media (max-width: 768px) {
    width: auto;
  }
`;
const TopBar = styled.div`
  width: 100%;
  max-width: 1200px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  gap: 15px;
`;
const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;
const SearchBox = styled.div`
  flex: 1;
  max-width: 500px;

  height: 50px;

  display: flex;
  align-items: center;

  background: white;
  border-radius: 14px;

  padding: 0 15px;

  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 15px;

  input {
    flex: 1;
    border: none;
    outline: none;
    padding-left: 10px;
  }
`;

const Home = ({ showSearch, search, setSearch, setShowSearch }) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const firstMatchRef = useRef(null);

  const filteredProducts = products.filter((item) => {
    if (!search.trim()) return true;

    return (
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.some((cat) =>
        cat.toLowerCase().includes(search.toLowerCase())
      )
    );
  });

  const getProducts = async () => {
    setLoading(true);
    await getAllProducts().then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (
      search.trim() &&
      filteredProducts.length > 0 &&
      firstMatchRef.current
    ) {
      firstMatchRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [search, filteredProducts]);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <TopBar>
        <LeftSide>
          {showSearch && (
            <SearchBox>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search food..."
                autoFocus
              />

              <CloseIcon
                onClick={() => {
                  setShowSearch(false);
                  setSearch("");
                }}
              />
            </SearchBox>
          )}
        </LeftSide>

        <AddButton onClick={() => setOpenModal(true)}>
          + Add Product
        </AddButton>
      </TopBar>
   
      {openModal && (
        <AddProductModal setOpenModal={setOpenModal} />
      )}

      <Section>
        <Img src={HeaderImage} />
      </Section>
      <Section>
        <Title>Food Categories</Title>
        <CardWrapper>
          {category.map((category) => (
            <ProductCategoryCard key={category.id} category={category} />
          ))}
        </CardWrapper>
      </Section>

      <Section>
        <Title>Most Popular</Title>
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {filteredProducts.map((product, index) => (
              <div key={product._id} ref={index === 0 ? firstMatchRef : null}>
                <ProductsCard product={product} />
              </div>

            ))}
          </CardWrapper>
        )}
      </Section>
    </Container>
  );
};

export default Home;
