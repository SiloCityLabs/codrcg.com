import Head from "next/head"; // Import Head for SEO
import { Container, Row, Col, Button } from "react-bootstrap"; // Added Button if you want a CTA in Hero
// --- Layout ---
import PageLayout from "@/components/PageLayout"; // Handles Navbar and Footer
// --- Components ---
import SclCard from "@/components/_silabs/SclCard";
// --- Data ---
import generatorList from "@/json/index/generator-list.json";
import zombieGeneratorList from "@/json/index/zombie-generator-list.json";

export default function HomePage() {
  const siteTitle = "COD RCG - Call of Duty Random Class Generators";
  const aboutText =
    "Dive into COD RCG, the ultimate random generator hub for Call of Duty fans! Created to add fun and unpredictability to your sessions, our site offers robust class generators for every CoD game – past, present, and future. Explore endless possibilities for Multiplayer, generate surprising loadouts for Zombies, and gear up for mayhem in Warzone. Looking for an extra layer of randomness? Let our generator pick your next Warzone drop zone! Built as a fully open-source project, COD RCG is dedicated to shaking up your gameplay and keeping things exciting, one random loadout at a time.";

  return (
    <PageLayout>
      {/* --- Hero Section --- */}
      <Container
        fluid
        className="bg-light p-4 p-md-5 mb-4 text-center"
        style={{ marginTop: "-25px" }}
      >
        <Container>
          <Row>
            <Col>
              <h1 className="display-4 fw-bold">{siteTitle}</h1>
              <p className="lead my-3">{aboutText}</p>
              <Button variant="primary" size="lg" href="#generators">
                Explore Generators
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* --- Generator Sections --- */}
      <Container className="my-3" id="generators">
        <Row className="shadow-lg p-3 bg-body rounded">
          <Col className="mx-auto">
            {/* --- Multiplayer Section --- */}
            <Row>
              <h2 className="text-center">Multiplayer Loadout Generators</h2>
              <p className="text-center text-muted mb-4">
                Generate random classes and unique loadouts for your favorite
                Call of Duty multiplayer modes below.
              </p>
              <hr />
              {generatorList.map((card, index) => (
                <Col
                  key={`mp-${index}`}
                  xl={3}
                  lg={4}
                  md={6}
                  className="text-center mb-4 d-flex align-items-stretch"
                >
                  <SclCard
                    title={card.title}
                    text={card.text}
                    variant={card.variant}
                    buttons={card.buttons}
                  />
                </Col>
              ))}
            </Row>

            {/* --- Zombies Section --- */}
            <Row className="mt-5">
              <h2 className="text-center">Zombies Loadout Generators</h2>
              <p className="text-center text-muted mb-4">
                Challenge yourself with unexpected weapon, perk, and equipment
                combinations in Zombies.
              </p>
              <hr />
              {zombieGeneratorList.map((card, index) => (
                <Col
                  key={`zm-${index}`}
                  xl={3}
                  lg={4}
                  md={6}
                  className="text-center mb-4 d-flex align-items-stretch"
                >
                  <SclCard
                    title={card.title}
                    text={card.text}
                    variant={card.variant}
                    buttons={card.buttons}
                  />
                </Col>
              ))}
            </Row>

            <Row className="mt-5 border-top pt-4">
              <Col md={6} className="mb-3 mb-md-0">
                <h4>Warzone Drop Zone Picker</h4>
                <p>
                  Can't decide where to land? Let fate choose your next drop
                  spot in Warzone!
                </p>
                <Button
                  variant="success"
                  href="/warzone/where-we-droppin"
                  rel="noopener noreferrer"
                >
                  Where we Droppin?
                </Button>
              </Col>
              <Col md={6}>
                <h4>Open Source Project</h4>
                <p>
                  COD RCG is built by the community. Check out the code or
                  contribute on GitHub!
                </p>
                <Button
                  variant="secondary"
                  href={process.env.NEXT_PUBLIC_APP_GITHUB_URL || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </PageLayout>
  );
}
