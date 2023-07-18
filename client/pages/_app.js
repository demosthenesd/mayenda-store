import { createGlobalStyle } from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";

const GlobalStyles = createGlobalStyle`
  body {
    background-color:#fefefe;
    padding: 0;
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App({ Component, pageProps }) {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          />
        </Helmet>

        <GlobalStyles />
        <Component {...pageProps} />
      </HelmetProvider>
    </>
  );
}
