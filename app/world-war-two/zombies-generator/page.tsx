import { Container, Row, Col } from "react-bootstrap";
import type { Metadata } from "next";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Loadout ---
import WorldWarTwoZombiesLoadout from "@/components/generators/world-war-two/WorldWarTwoZombiesLoadout";

// --- Metadata ---
export const metadata: Metadata = {
  title: "World War Two Zombies",
  description:
    "Spice up your COD Zombies gameplay! Generate unique random loadouts for Call of Duty World War Two Zombies. Discover new weapons, perks, and gear combinations.",
  keywords: [
    "COD World War Two RCG",
    "world war two random class generator",
    "world war two",
    "world war two rcg",
    "world war two random class generator",
    "class generator",
    "zombies",
    "world war two zombies",
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Multiplayer Generator", href: "/world-war-two/generator" },
  { label: "Zombies Generator", href: "/world-war-two/zombies-generator" },
  { label: "Custom Match", href: "/world-war-two/custom-match" },
  { label: "Loadout Info", href: "/world-war-two/info" },
  { label: "Changelog", href: "/changelog" },
];

export default function WorldWarTwoZombiesGeneratorPage() {
  return (
    <PageLayout navLinks={navLinks} headerClassName="ww2">
      <Container>
        <h2 className="text-center mb-4">
          World War Two Zombies
          <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
          <br className="d-block d-sm-none" />
          Random Class Generator
        </h2>
        <Row className="shadow-lg p-3 bg-body rounded mb-4">
          <Col className="mx-auto">
            <WorldWarTwoZombiesLoadout />
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}
