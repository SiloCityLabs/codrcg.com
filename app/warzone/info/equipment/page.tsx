import { Container, Row, Col } from "react-bootstrap";
// --- Next ---
import type { Metadata } from "next";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Components ---
import EquipmentList from "@/components/info/EquipmentList";

// --- Metadata ---
export const metadata: Metadata = {
  title: "Warzone Equipment",
  description: "View all equipment in Warzone.",
  keywords: [
    "COD Warzone RCG",
    "warzone random class generator",
    "warzone",
    "warzone rcg",
    "warzone random class generator",
    "class generator",
    "warzone rcg",
    "warzone random class generator",
    "black ops 6",
    "modern warfare 3",
    "modern warfare 2",
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Generator", href: "/warzone/generator" },
  { label: "Where We Droppin?", href: "/warzone/where-we-droppin" },
  { label: "Loadout Info", href: "/warzone/info" },
  { label: "Changelog", href: "/changelog" },
];

export default function WarzoneEquipmentPage() {
  return (
    <PageLayout navLinks={navLinks} headerClassName="warzone">
      <Container>
        <h2 className="text-center mb-4">
          Warzone
          <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
          <br className="d-block d-sm-none" />
          Equipment
        </h2>
        <Row className="shadow-lg p-3 bg-body rounded mb-4">
          <Col>
            <EquipmentList game="warzone" />
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}
