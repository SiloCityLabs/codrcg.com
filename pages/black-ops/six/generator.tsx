import { useEffect, useState } from "react";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/components/Header";
import BlackOpsSixLoadout from "@/components/generators/black-ops/six/BlackOpsSixLoadout";
import { generateGithubLink } from "@/helpers/generateGithubLink";

let navLinks = [
  { label: "Home", href: "/" },
  { label: "Zombies Generator", href: "/black-ops/six/zombies-generator", target: "" },
  { label: "Loadout Info", href: "/black-ops/six/info", target: "" },
  { label: "Changelog", href: "/changelog", target: "" },
];
export default function BlackOpsSix() {
  const [isLoading, setIsLoading] = useState(true);
  const params = {
    title: "Black Ops 6 MP Generator: ",
    labels: "Black Ops 6"
  };

  useEffect(() => {
    const feedbackLink = generateGithubLink("SiloCityLabs", "codrcg.com", params);
    navLinks.push({ label: "Feedback", href: feedbackLink, target: "_blank" });
    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Black Ops 6 Random Class Generator</title>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="description"
          content="Spice up your COD gameplay! Generate unique random loadouts for Black Ops 6. Discover new weapons, perks, and gear combinations."
        />
        <meta
          name="keywords"
          content="Call of duty, call, of, duty, cod, call of duty, random, class, generator, random class generator, rcg,
          free, mp, multiplayer, call of duty random class generator, COD Black Ops 6 RCG, COD Blops 6 RCG, blops 6 random class generator,
          blops 6, black ops 6, ops 6 rcg, ops 6 random class generator, black ops 6 random class generator, zombies, treyarch zombies,
          black ops zombies, black ops 6 zombies, black ops rcg, black ops random class generator"
        />
      </Head>
      <Header className="black-ops" navLinks={navLinks} />
      <Container fluid>
        <Row>
          <Col>
            <h2 className="text-center mb-4">
              Black Ops 6
              <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
              <br className="d-block d-sm-none" />
              Random Class Generator
            </h2>

            {!isLoading && (<BlackOpsSixLoadout />)}
          </Col>
        </Row>
      </Container>
    </>
  );
}
