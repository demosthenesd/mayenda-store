import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
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

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;
export default function CartPage() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((res) => {
        setProducts(res.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function addQuantity(id) {
    addProduct(id);
  }

  function subQuantity(id) {
    removeProduct(id);
  }

  let total = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <Box>
            <h2>Cart</h2>
            {!cartProducts?.length && <div>Your Cart is empty</div>}

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
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {!!cartProducts?.length && (
            <Box>
              <h2>Order information</h2>
              <form method="post" action="/api/checkout">
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    name="city"
                    value={city}
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Post Code"
                    name="postCode"
                    value={postCode}
                    onChange={(ev) => setPostCode(ev.target.value)}
                  />
                </CityHolder>

                <Input
                  type="text"
                  placeholder="Street Address"
                  name="streetAddress"
                  value={streetAddress}
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  name="country"
                  value={country}
                  onChange={(ev) => setCountry(ev.target.value)}
                />

                <input
                  type="hidden"
                  name="products"
                  value={cartProducts.join(",")}
                />
                <Button size={"l"} block={1} primary={1} type="submit">
                  Continue to payment
                </Button>
              </form>
            </Box>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
