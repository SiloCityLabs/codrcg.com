import { Container, Row, Col } from "react-bootstrap";
// --- Next ---
import type { Metadata } from "next";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Components ---
import EquipmentList from "@/components/info/EquipmentList";

// --- Metadata ---
export const metadata: Metadata = {
  title: "Infinite Warfare Equipment",
  description: "View all equipment in Infinite Warfare.",
  keywords: [
    "COD Infinite Warfare RCG",
    "COD IW RCG",
    "iw random class generator",
    "iw",
    "infinite warfare",
    "infinite warfare rcg",
    "infinite warfare random class generator",
    "infinite warfare rcg",
    "infinite warfare random class generator",
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Multiplayer Generator", href: "/infinite-warfare/generator" },
  { label: "Loadout Info", href: "/infinite-warfare/info" },
  { label: "Changelog", href: "/changelog" },
];

export default function InfiniteWarfareEquipmentPage() {
  return (
    <PageLayout navLinks={navLinks} headerClassName="infinite-warfare">
      <Container>
        <h2 className="text-center mb-4">
          Infinite Warfare
          <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
          <br className="d-block d-sm-none" />
          Equipment
        </h2>
        <Row className="shadow-lg p-3 bg-body rounded mb-4">
          <Col>
            <EquipmentList game="infinite-warfare" />
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}
