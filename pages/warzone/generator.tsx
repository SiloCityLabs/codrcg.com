import { useEffect, useState } from "react";
import Head from "next/head";
import { Container, Row, Col } from "react-bootstrap";
import Header from "@/components/Header";
//Components
import WarzoneLoadout from "@/components/generators/warzone/WarzoneLoadout";
//DB
import getDocumentByColumn from "@/helpers/_silabs/pouchDb/getDocumentByColumn";
import { useDatabase } from "@/contexts/DatabaseContext";
//Types
import { sclSettings } from "@/types/_fw";

export default function Warzone() {
  const { dbs, isReady } = useDatabase();
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState<sclSettings>({});
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Where We Droppin?", href: "/warzone/where-we-droppin" },
    { label: "Loadout Info", href: "/warzone/info" },
    { label: "Changelog", href: "/changelog" },
  ];

  useEffect(() => {
    async function fetchData() {
      if (dbs.settings) {
        try {
          const wzSettings = await getDocumentByColumn(
            dbs.settings,
            "name",
            "warzone",
            "settings"
          );
          if (wzSettings && wzSettings.value !== "") {
            setSettings(JSON.parse(wzSettings.value));
          }
        } catch (err: unknown) {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to fetch settings.";
          console.warn(errorMessage);
        } finally {
          setIsLoading(false);
        }
      }
    }
    if (isReady) {
      fetchData();
    }
  }, [dbs, isReady]);

  if (!isReady || isLoading) {
    return <div className="text-center">Loading database...</div>;
  }

  return (
    <>
      <Head>
        <title>Warzone Random Class Generator</title>
        <meta
          name="description"
          content="Spice up your COD gameplay! Generate unique random loadouts for Warzone. Discover new weapons, perks, and gear combinations."
        />
        <meta
          name="keywords"
          content="Call of duty, call, of, duty, cod, call of duty, random, class, generator, random class generator, rcg,
          free, mp, multiplayer, call of duty random class generator, COD Warzone RCG, warzone random class generator,
          warzone, warzone rcg, warzone random class generator, class generator, warzone rcg, warzone random class generator,
          black ops 6, modern warfare 3, modern warfare 2"
        />
      </Head>
      <Header className="warzone" navLinks={navLinks} />
      <Container fluid>
        <Row>
          <Col>
            <h2 className="text-center mb-4">
              Warzone
              <span className="d-none d-sm-inline-block">&nbsp;-&nbsp;</span>
              <br className="d-block d-sm-none" />
              Random Class Generator
            </h2>

            <WarzoneLoadout settings={settings} />
          </Col>
        </Row>
      </Container>
    </>
  );
}
