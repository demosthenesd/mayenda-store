import Link from "next/link";
import styled from "styled-components";
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

const Footer = () => {
  return (
    <FooterStyling>
      <div>
        <NavLink href={"/"}>Home</NavLink>
        <NavLink href={"/products"}>Products</NavLink>
        <NavLink href={"/cart"}>Cart</NavLink>
      </div>
      <div>
        <p>A Dems Demecillo Project </p>
        <p>&copy; {new Date().getFullYear()} </p>
      </div>
    </FooterStyling>
  );
};

export default Footer;
