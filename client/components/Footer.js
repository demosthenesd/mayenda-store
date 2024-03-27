import Link from "next/link";
import styled from "styled-components";

const FooterStyling = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
      <Wrapper>
        <div>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </div>
        <div>
          <p>&copy; {new Date().getFullYear()} Your Company</p>
        </div>
      </Wrapper>
    </FooterStyling>
  );
};

export default Footer;
