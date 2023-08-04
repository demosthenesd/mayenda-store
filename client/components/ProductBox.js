import styled from "styled-components";
import Button from "./Button";
import CartIcon from "@/icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
const ProductWrapper = styled.div``;
const WhiteBox = styled(Link)`
  background-color: #2d2d2d;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 150px;
  }
`;
const Title = styled(Link)`
  font-weight: normal;
  font-size: 1rem;
  margin: 0;
  padding-top: 5px;
  color: inherit;
  text-decoration: none;
`;
const ProductInfoBox = styled.div`
  margin-top: 5px;
`;
const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;
const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;
export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);

  const url = "/product/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={""}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary={1} outline={1} onClick={() => addProduct(_id)}>
            <CartIcon />
            Add to Cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
