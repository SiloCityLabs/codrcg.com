import React, { useState, useEffect } from "react";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
//Components
import Header from "@/components/Header";
import InfoList from "@/components/info/InfoList";
//Helpers
import { getSpecialists } from "@/helpers/info/getSpecialists";

export default function InfiniteWarfareCombatRigs() {
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Multiplayer Generator", href: "/infinite-warfare/generator" },
    { label: "Loadout Info", href: "/infinite-warfare/info" },
    { label: "Changelog", href: "/changelog" },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const dataKeys = ["name", "payload", "trait", "type", "game"];

  useEffect(() => {
    const dataList = getSpecialists("infinite-warfare");

    //Format data
    for (const key in dataList) {
      const item = dataList[key];

      // Join the names with commas
      item.payload = item.payload.join(", ");
      item.trait = item.trait.join(", ");
    }

    setData(dataList);

    setIsLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Infinite Warfare Combat Rigs</title>
        <meta
          name="description"
          content="View all combat rigs in Infinite Warfare."
        />
        <meta
          name="keywords"
          content="Call of duty, call, of, duty, cod, call of duty, random, class, generator, random class generator, rcg,
          free, mp, multiplayer, call of duty random class generator, COD Infinite Warfare RCG, COD IW RCG, iw random class generator,
          iw, infinite warfare, infinite warfare rcg, infinite warfare random class generator, infinite warfare rcg, infinite warfare random class generator"
        />
      </Head>
      <Header className="infinite-warfare" navLinks={navLinks} />
      <Container fluid>
        <Row>
          <Col>
            <h2 className="text-center mb-4">
              Infinite Warfare
              <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
              <br className="d-block d-sm-none" />
              Combat Rigs
            </h2>

            {!isLoading && <InfoList data={data} dataKeys={dataKeys} />}
          </Col>
        </Row>
      </Container>
    </>
  );
}
