import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { generateGithubLink } from "@/helpers/generateGithubLink";

interface HeaderProps {
  className?: string;
  navLinks?: { label: string; href: string; target?: string }[];
  darkLinks?: boolean;
}

const defaultNavLinks = [
  { label: "Home", href: "/", target: "" },
  { label: "Changelog", href: "/changelog", target: "" },
  {
    label: "GitHub",
    href: "https://github.com/SiloCityLabs/codrcg.com",
    target: "_blank",
  },
];

function Header(props: HeaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { className, navLinks = defaultNavLinks, darkLinks = false } = props;
  const params = {
    title: "COD RCG Feeback: "
  };

  useEffect(() => {
    const feedbackLink = generateGithubLink("SiloCityLabs", "codrcg.com", params);
    defaultNavLinks.push({ label: "Feedback", href: feedbackLink, target: "_blank" });
    setIsLoading(false);
  }, []);


  return (
    <Navbar
      id="cod-header"
      expand="lg"
      bg="dark"
      data-bs-theme="dark"
      className={`${className}`}
    >
      <Container>
        <Navbar.Brand href="/">COD RCG</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className={darkLinks ? 'black-toggler' : ""} />
        <Navbar.Collapse id="basic-navbar-nav">
          {
            !isLoading && (
              <Nav className="me-auto">
                {navLinks.map((link, index) => (
                  <Nav.Link
                    key={index}
                    href={link.href}
                    target={link.target || "_self"}
                  >
                    {link.label}
                  </Nav.Link>
                ))}
              </Nav>
            )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
