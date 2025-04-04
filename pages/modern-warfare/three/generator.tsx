import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/components/Header";
import ModernWarfareThreeLoadout from "@/components/generators/modern-warfare/three/ModernWarfareThreeLoadout";

export default function ModernWarfareThree() {
  const navLinks = [
    { label: "Home", href: "/" },
    {
      label: "Zombies Generator",
      href: "/modern-warfare/three/zombies-generator",
    },
    { label: "Loadout Info", href: "/modern-warfare/three/info" },
    { label: "Changelog", href: "/changelog" },
  ];

  return (
    <>
      <Head>
        <title>Modern Warfare 3 Random Class Generator</title>
        <meta
          name="description"
          content="Spice up your COD Zombies gameplay! Generate unique random loadouts for Modern Warfare 3. Discover new weapons, perks, and gear combinations."
        />
        <meta
          name="keywords"
          content="Call of duty, call, of, duty, cod, call of duty, random, class, generator, random class generator, rcg,
          free, mp, multiplayer, call of duty random class generator, COD Modern Warfare 3 RCG, COD MW3 RCG, mw3 random class generator,
          mw3, modern warfare 3, modern warfare 3 rcg, modern warfare 3 random class generator, class generator, zombies, Infinity Ward zombies,
          modern warfare zombies, modern warfare 3 zombies, modern warfare rcg, modern warfare random class generator"
        />
      </Head>
      <Header className="modern-warfare" navLinks={navLinks} />
      <Container fluid>
        <Row>
          <Col>
            <h2 className="text-center mb-4">
              Modern Warfare 3
              <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
              <br className="d-block d-sm-none" />
              Random Class Generator
            </h2>

            <ModernWarfareThreeLoadout />
          </Col>
        </Row>
      </Container>
    </>
  );
}
