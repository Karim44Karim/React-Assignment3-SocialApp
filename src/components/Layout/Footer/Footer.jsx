
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";
import { Link } from "react-router-dom";

export default function AppFooter() {
  return (
    <Footer container className="rounded-none">
      <FooterCopyright href="#" by="Karim" year={2025}/>
      <FooterLinkGroup>
        <FooterLink as={Link} to="/">Home</FooterLink>
        <FooterLink as={Link} to="/profile">Profile</FooterLink>
        <FooterLink as={Link} to="/login">Login</FooterLink>
        <FooterLink as={Link} to="/register">Register</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
