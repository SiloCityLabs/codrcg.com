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
    "Spice up your COD gameplay! Generate unique random loadouts for Call of Duty Infinite Warfare. Discover new weapons, perks, and gear combinations.",
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

const badges = [
  {
    title: "Equipment",
    link: "/infinite-warfare/info/equipment",
  },
  {
    title: "Perks",
    link: "/infinite-warfare/info/perks",
  },
  {
    title: "Combat Rigs",
    link: "/infinite-warfare/info/combat-rigs",
  },
  {
    title: "Streaks",
    link: "/infinite-warfare/info/streaks",
  },
  {
    title: "Weapons",
    link: "/infinite-warfare/info/weapons",
  },
];

export default function InfiniteWarfareInfoPage() {
  return (
    <PageLayout navLinks={navLinks} headerClassName="infinite-warfare">
      <Container>
        <h2 className="text-center mb-4">
          Infinite Warfare
          <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
          <br className="d-block d-sm-none" />
          Loadout Information
        </h2>
        <Row className="shadow-lg p-3 bg-body rounded mb-4">
          <Col lg={7} className="text-center">
            <p>
              Take the fight to the final frontier with our Call of Duty:
              Infinite Warfare intel database. Prepare for futuristic warfare
              across the solar system by exploring comprehensive guides on
              advanced <strong>Weapons</strong>, tactical{" "}
              <strong>Equipment</strong>, essential <strong>Perks</strong>,
              powerful <strong>Scorestreaks</strong>, and the unique{" "}
              <strong>Combat Rigs</strong> system with their specialized
              Payloads and Traits. Find all the links you need on this page to
              master Infinite Warfare&apos;s multiplayer arena.
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
                  <CodBadge
                    name={item.title}
                    badgeOverwrite="bgInfiniteWarfare"
                    needsDarkText={true}
                  />
                </Link>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}
