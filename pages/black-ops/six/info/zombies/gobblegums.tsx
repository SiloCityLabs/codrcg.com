import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
//Components
import Header from "@/components/Header";
import InfoList from "@/components/info/InfoList";
//Helpers
import { getZombiesGobblegums } from "@/helpers/info/zombies/getZombiesGobblegums";

export default function BlackOpsSixZombiesGobblegums() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Multiplayer Generator", href: "/black-ops/six/generator" },
    { label: "Zombies Generator", href: "/black-ops/six/zombies-generator" },
    { label: "Loadout Info", href: "/black-ops/six/info" },
    { label: "Changelog", href: "/changelog" },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const dataKeys = ["name", "type", "game", "isDlc"];

  useEffect(() => {
    const dataList = getZombiesGobblegums("black-ops-six-zombies");
    setData(dataList);

    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Black Ops 6 Zombies Gobblegums</title>
        <meta
          name="description"
          content="View all zombies gobblegums in Black Ops 6."
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
              Zombies Gobblegums
            </h2>

            {!isLoading && <InfoList data={data} dataKeys={dataKeys} />}
          </Col>
        </Row>
      </Container>
    </>
  );
}
