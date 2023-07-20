import { createGlobalStyle } from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { CartContextProvider } from "@/components/CartContext";
const GlobalStyles = createGlobalStyle`
  body {
    background-color:#fefefe;
    padding: 0;
    margin: 0;
    font-family: 'Poppins', sans-serif;
  }
`;
export default function App({ Component, pageProps }) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          />
        </Helmet>
      </HelmetProvider>
      <GlobalStyles />
      <CartContextProvider>
        <Component {...pageProps} />
      </CartContextProvider>
    </>
  );
}
