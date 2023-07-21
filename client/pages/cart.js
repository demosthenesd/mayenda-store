import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;
const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;
const ProductInfoCell = styled.td`
  padding: 10px 0 5px;
`;

const ProductImg = styled.div`
  padding: 10px;
  box-shadow: 0 0 10px #8f466f;
  max-width: 150px;
  max-height: 150px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
  img {
    max-width: 150px;
    max-height: 150px;
    min-height: 70px;
  }
`;
const QuantityLabel = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5px;
`;

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    }
  }, [cartProducts]);

  function addQuantity(id) {
    addProduct(id);
  }

  function subQuantity(id) {
    removeProduct(id);
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            {!cartProducts?.length && <div>Your Cart is empty</div>}
            <h2>Cart</h2>

            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr>
                      <ProductInfoCell>
                        <ProductImg>
                          <img src={product.images[0]} alt="" />
                        </ProductImg>
                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button
                          onClick={() => subQuantity(product._id)}
                          quantity={1}
                          primary={1}
                        >
                          -
                        </Button>
                        {cartProducts.filter((id) => id === product._id).length}

                        <Button
                          onClick={() => addQuantity(product._id)}
                          quantity={1}
                          primary={1}
                        >
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Address 2" />
              <Button size={"l"} block={1} primary={1}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
