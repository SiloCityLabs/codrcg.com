import { Container, Row, Col } from "react-bootstrap";
// --- Next ---
import type { Metadata } from "next";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Components ---
import StreakList from "@/components/info/StreakList";

// --- Metadata ---
export const metadata: Metadata = {
  title: "Black Ops Four Streaks",
  description: "View all streaks in Black Ops Four.",
  keywords: [
    "COD Black Ops Four RCG",
    "black ops four random class generator",
    "black ops four",
    "black ops four rcg",
    "class generator",
    "zombies",
    "treyarch zombies",
    "black ops four zombies",
    "black ops four rcg",
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Multiplayer Generator", href: "/black-ops/four/generator" },
  { label: "Zombies Generator", href: "/black-ops/four/zombies/generator" },
  {
    label: "Zombies Custom Mutations",
    href: "/black-ops/four/zombies/custom-mutations",
  },
  { label: "Loadout Info", href: "/black-ops/four/info" },
  { label: "Changelog", href: "/changelog" },
];

export default function BlackOpsFourStreaksPage() {
  return (
    <PageLayout navLinks={navLinks} headerClassName="black-ops">
      <Container>
        <h2 className="text-center mb-4">
          Black Ops Four
          <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
          <br className="d-block d-sm-none" />
          Streaks
        </h2>
        <Row className="shadow-lg p-3 bg-body rounded mb-4">
          <Col>
            <StreakList game="black-ops-four" />
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}
