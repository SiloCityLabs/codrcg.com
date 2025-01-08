import Head from "next/head";
import { useRouter } from "next/router";
import { Container, Row, Col } from "react-bootstrap";
//Components
import Header from "@/components/Header";
import WeaponInfo from "@/components/info/WeaponInfo";
//Styles
import "@/public/styles/components/Loadout.css";

export default function BlackOpsSixWeapon() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Multiplayer Generator", href: "/black-ops-six/generator" },
    { label: "Zombies Generator", href: "/black-ops-six/zombies-generator" },
    { label: "Changelog", href: "/changelog" },
  ];

  const router = useRouter();
  const { query } = router;
  const weaponName = (query.weaponName as string) || "";

  //TODO: Handle empty weaponName

  return (
    <>
      <Head>
        <title>Black Ops 6 Weapon - {weaponName}</title>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="View information for weapons in Black Ops 6. View all attachments."
        />
        <meta
          name="keywords"
          content="Call of duty, call, of, duty, cod, call of duty, random, class, generator, random class generator, rcg,
          free, mp, multiplayer, call of duty random class generator, COD Black Ops 6 RCG, COD Blops 6 RCG, blops 6 random class generator,
          blops 6, black ops 6, ops 6 rcg, ops 6 random class generator, black ops 6 random class generator, zombies, treyarch zombies,
          black ops zombies, black ops 6 zombies, black ops rcg, black ops random class generator"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        {/* Each generator has icons in the icon folder, not bo6 yet */}
      </Head>
      <Header className="black-ops" navLinks={navLinks} />
      <Container className="generator" fluid>
        <Row>
          <Col>
            <h2>Black Ops 6 - Weapon - {weaponName}</h2>

            <WeaponInfo name={weaponName} />
          </Col>
        </Row>
      </Container>
    </>
  );
}