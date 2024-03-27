import Link from "next/link";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import Center from "./Center";
const FooterStyling = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 20px;
  margin-top: 60px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #aaa;
  text-decoration: none;
  margin-right: 15px;
`;
const { cartProducts } = useContext(CartContext);

const Footer = () => {
  return (
    <FooterStyling>
      <Center>
        <div>
          <NavLink href={"/"}>Home</NavLink>
          <NavLink href={"/products"}>Products</NavLink>
          <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
        </div>
        <div>
          <p>A Dems Demecillo Project </p>
          <p>&copy; {new Date().getFullYear()} </p>
        </div>
      </Center>
    </FooterStyling>
  );
};

export default Footer;
