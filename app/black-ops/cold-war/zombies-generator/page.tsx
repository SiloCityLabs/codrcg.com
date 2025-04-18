import { Container, Row, Col } from "react-bootstrap";
import type { Metadata } from "next";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Loadout ---
import VanguardZombiesLoadout from "@/components/generators/vanguard/VanguardZombiesLoadout";

// --- Metadata ---
export const metadata: Metadata = {
  title: "Black Ops Cold War Zombies",
  description:
    "Spice up your COD Zombies gameplay! Generate unique random loadouts for Call of Duty Black Ops Cold War Zombies. Discover new weapons, perks, and gear combinations.",
  keywords: [
    "COD Black Ops Cold War RCG",
    "vanguard random class generator",
    "vanguard",
    "vanguard rcg",
    "vanguard random class generator",
    "class generator",
    "zombies",
    "treyarch zombies",
    "vanguard zombies",
    "vanguard rcg",
    "vanguard random class generator",
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Multiplayer Generator", href: "/vanguard/generator" },
  { label: "Zombies Generator", href: "/vanguard/zombies-generator" },
  { label: "Loadout Info", href: "/vanguard/info" },
  { label: "Changelog", href: "/changelog" },
];

export default function VanguardZombiesGeneratorPage() {
  return (
    <PageLayout navLinks={navLinks} headerClassName="vanguard">
      <Container>
        <h2 className="text-center mb-4">
          Black Ops Cold War Zombies
          <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
          <br className="d-block d-sm-none" />
          Random Class Generator
        </h2>
        <Row className="shadow-lg p-3 bg-body rounded mb-4">
          <Col className="mx-auto">
            <VanguardZombiesLoadout />
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}
