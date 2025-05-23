import { Container, Row, Col } from "react-bootstrap";
// --- Next ---
import type { Metadata } from "next";
import Link from "next/link";
// --- Layout ---
import PageLayout from "@/components/PageLayout";
// --- Components ---
import CodBadge from "@/components/CodBadge";

// --- Metadata ---
export const metadata: Metadata = {
  title: "Loadout Information",
  description:
    "Spice up your COD gameplay! Generate unique random loadouts for Modern Warfare Two. Discover new weapons, perks, and gear combinations.",
  keywords: [
    "COD Modern Warfare Two RCG",
    "modern warfare two random class generator",
    "modern warfare two",
    "modern warfare two rcg",
    "class generator",
  ],
};

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Multiplayer Generator",
    href: "/modern-warfare/two/generator",
  },
  { label: "Loadout Info", href: "/modern-warfare/two/info" },
  { label: "Changelog", href: "/changelog" },
];

const badges = [
  {
    title: "Equipment",
    link: "/modern-warfare/two/info/equipment",
  },
  {
    title: "Perks",
    link: "/modern-warfare/two/info/perks",
  },
  {
    title: "Streaks",
    link: "/modern-warfare/two/info/streaks",
  },
  {
    title: "Weapons",
    link: "/modern-warfare/two/info/weapons",
  },
];

export default function ModernWarfareTwoInfoPage() {
  return (
    <PageLayout navLinks={navLinks} headerClassName="mw2">
      <Container>
        <h2 className="text-center mb-4">
          Modern Warfare Two
          <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
          <br className="d-block d-sm-none" />
          Loadout Information
        </h2>
        <Row className="shadow-lg p-3 bg-body rounded mb-4">
          <Col lg={7} className="text-center">
            <p>
              Gear up for the global conflict depicted in Call of Duty: Modern
              Warfare II [2022] with our comprehensive data collection. This
              section details the tools of modern warfare featured in this
              title. Explore the innovative <strong>Weapon</strong> Platforms to
              customize your loadout, choose the right tactical and lethal{" "}
              <strong>Equipment</strong>, select powerful{" "}
              <strong>Perk Packages</strong> to gain advantages during the
              match, and learn about the devastating <strong>Streaks</strong>{" "}
              (Killstreaks or Scorestreaks) you can call in. Find all the
              essential links on this page.
            </p>
          </Col>
          <Col lg={5}>
            <h4 className="text-center">Links</h4>
            <hr />
            <div className="d-flex flex-wrap gap-2">
              {badges.map((item) => (
                <Link
                  key={item.title}
                  href={item.link}
                  className="text-decoration-none"
                  passHref
                >
                  <CodBadge name={item.title} badgeOverwrite="bgMw2" />
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}
