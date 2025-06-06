import { Container, Row, Col } from "react-bootstrap";
import type { Metadata } from "next";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Loadout ---
import BlackOpsSixLoadout from "@/components/generators/black-ops/six/BlackOpsSixLoadout";

// --- Metadata ---
export const metadata: Metadata = {
  title: "Black Ops Six",
  description:
    "Spice up your COD gameplay! Generate unique random loadouts for Call of Duty Black Ops Six. Discover new weapons, perks, and gear combinations.",
  keywords: [
    "COD Black Ops Six RCG",
    "black ops six random class generator",
    "black ops six",
    "black ops six rcg",
    "class generator",
    "zombies",
    "treyarch zombies",
    "black ops six zombies",
    "black ops six rcg",
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Multiplayer Generator", href: "/black-ops/six/generator" },
  { label: "Zombies Generator", href: "/black-ops/six/zombies-generator" },
  { label: "Loadout Info", href: "/black-ops/six/info" },
  { label: "Changelog", href: "/changelog" },
];

export default function BlackOpsSixGeneratorPage() {
  return (
    <PageLayout navLinks={navLinks} headerClassName="black-ops">
      <Container>
        <h2 className="text-center mb-4">
          Black Ops Six
          <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
          <br className="d-block d-sm-none" />
          Random Class Generator
        </h2>
        <Row className="shadow-lg p-3 bg-body rounded mb-4">
          <Col className="mx-auto">
            <BlackOpsSixLoadout />
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}
