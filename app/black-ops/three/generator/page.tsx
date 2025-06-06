import { Container, Row, Col } from "react-bootstrap";
import type { Metadata } from "next";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Loadout ---
import BlackOpsThreeLoadout from "@/components/generators/black-ops/three/BlackOpsThreeLoadout";

// --- Metadata ---
export const metadata: Metadata = {
  title: "Black Ops Three",
  description:
    "Spice up your COD gameplay! Generate unique random loadouts for Call of Duty Black Ops Three. Discover new weapons, perks, and gear combinations.",
  keywords: [
    "COD Black Ops Three RCG",
    "black ops three random class generator",
    "black ops three",
    "black ops three rcg",
    "class generator",
    "zombies",
    "treyarch zombies",
    "black ops three zombies",
    "black ops three rcg",
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Multiplayer Generator", href: "/black-ops/three/generator" },
  { label: "Loadout Info", href: "/black-ops/three/info" },
  { label: "Changelog", href: "/changelog" },
];

export default function BlackOpsThreeGeneratorPage() {
  return (
    <PageLayout navLinks={navLinks} headerClassName="black-ops">
      <Container>
        <h2 className="text-center mb-4">
          Black Ops Three
          <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
          <br className="d-block d-sm-none" />
          Random Class Generator
        </h2>
        <Row className="shadow-lg p-3 bg-body rounded mb-4">
          <Col className="mx-auto">
            <BlackOpsThreeLoadout />
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}
