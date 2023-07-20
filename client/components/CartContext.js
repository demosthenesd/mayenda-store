const { createContext, useState } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  const [cartProducts, setCartProducts] = useState([]);

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
}
