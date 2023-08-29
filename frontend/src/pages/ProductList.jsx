import styled from "styled-components";
import Navbar from "../components/Navbar";
import Welcome from "../components/Welcome";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { mobile } from "../smallScreen";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`;
const Option = styled.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [e.target.name]: value.toLowerCase(),
    }));
  };

  return (
    <Container>
      <Navbar />
      <Welcome />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="type" onChange={handleFilter}>
            <Option disabled>Type</Option>
            <Option>Organic</Option>
            <Option>Dairy</Option>
            <Option>Protein</Option>
            <Option>Fat</Option>
            <Option>Starchy</Option>
            <Option>Green</Option>
          </Select>
          <Select name="options" onChange={handleFilter}>
            <Option disabled>Options</Option>
            <Option>Small</Option>
            <Option>Large</Option>
            <Option>Family</Option>
            <Option>Party</Option>
            <Option>Festival</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filter={filter} sort={sort} />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
