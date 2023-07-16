import { styled } from "styled-components";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default function NewProducts({ products }) {
  return (
    <ProductsGrid>
      {products?.length > 0 &&
        products.map((product) => (
          <div key={products._id}>{product.title}</div>
        ))}
    </ProductsGrid>
  );
}
