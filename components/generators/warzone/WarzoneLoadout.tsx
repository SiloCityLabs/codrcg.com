import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SimpleGeneratorView from "@/components/generators/cod/SimpleGeneratorView";
import CodClassName from "@/components/CodClassName";
//Helpers
import { implodeObject } from "../../../helpers/implodeObject";
import { scrollToTop } from "@/helpers/scrollToTop";
import { fetchWeapon } from "../../../helpers/fetch/fetchWeapon";
import { fetchPerks } from "../../../helpers/fetch/fetchPerks";
import { fetchAttachments } from "@/helpers/fetch/fetchAttachments";
import { fetchEquipment } from "@/helpers/fetch/fetchEquipment";
import { fetchWildcard } from "@/helpers/fetch/fetchWildcard";
import { fetchClassName } from "@/helpers/fetch/fetchClassName";
import { getEnabledGames } from "@/helpers/generator/getEnabledGames";
//Utils
import { sendEvent } from "@/utils/gtag";
//JSON
import defaultData from "@/json/cod/default-generator-info.json";
//Types
import { sclSettings } from "@/types/_fw";

interface WarzoneProps {
  settings: sclSettings;
}
function WarzoneLoadout({ settings }: WarzoneProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    fetchLoadoutData(setData, settings);
    setIsGenerating(false);
    setIsLoading(false);
  }, [settings]);

  const handleClick = async () => {
    setIsGenerating(true);

    setTimeout(() => {
      fetchLoadoutData(setData, settings);
      setIsGenerating(false);
      scrollToTop();
    }, 1000);
  };

  const { randClassName, perks, weapons, equipment, wildcard } = data;

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <Container id="random-class" className="shadow-lg p-3 bg-body rounded">
        <CodClassName isGenerating={isGenerating} value={randClassName} />
        <Row className="justify-content-md-center">
          <Col sm className="text-center mb-3 mb-md-0">
            <SimpleGeneratorView
              isGenerating={isGenerating}
              title="Primary"
              value={weapons.primary.weapon.name}
            />
            <br />
            <SimpleGeneratorView
              isGenerating={isGenerating}
              title="Primary Attachments"
              value={
                weapons.primary.weapon.no_attach
                  ? "No Attachments"
                  : weapons.primary.attachments
              }
            />
          </Col>
          <Col sm className="text-center mb-3 mb-md-0">
            <SimpleGeneratorView
              isGenerating={isGenerating}
              title="Secondary"
              value={weapons.secondary.weapon.name}
            />
            <br />
            <SimpleGeneratorView
              isGenerating={isGenerating}
              title="Secondary Attachments"
              value={
                weapons.secondary.weapon.no_attach
                  ? "No Attachments"
                  : weapons.secondary.attachments
              }
            />
          </Col>
          <Col sm className="text-center">
            <SimpleGeneratorView
              isGenerating={isGenerating}
              title="Melee"
              value={weapons.melee.name}
            />
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-md-center">
          <Col sm className="text-center mb-3 mb-md-0">
            <SimpleGeneratorView
              isGenerating={isGenerating}
              title="Tactical"
              value={equipment.tactical.name}
            />
          </Col>
          <Col sm className="text-center mb-3 mb-md-0">
            <SimpleGeneratorView
              isGenerating={isGenerating}
              title="Lethal"
              value={equipment.lethal.name}
            />
          </Col>
        </Row>
        <hr />
        <Row className="mb-5">
          <Col sm className="text-center mb-3 mb-md-0">
            <SimpleGeneratorView
              isGenerating={isGenerating}
              title="Perks"
              value={perks}
            />
          </Col>
          <Col sm className="text-center">
            <SimpleGeneratorView
              isGenerating={isGenerating}
              title="Wildcard"
              value={wildcard.name}
            />
          </Col>
        </Row>
        <Row id="button-row">
          <Col className="text-center">
            <Button
              variant="success"
              disabled={isGenerating}
              onClick={isGenerating ? undefined : handleClick}
            >
              {isGenerating ? "Generating Loadout..." : "Generate Loadout"}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

async function fetchLoadoutData(setData, settings) {
  sendEvent("button_click", {
    button_id: "warzone_fetchLoadoutData",
    label: "Warzone",
    category: "COD_Loadouts",
  });

  try {
    const game = "warzone";
    const randClassName = fetchClassName();
    const wildcard = fetchWildcard(game);
    //Figure out primary attachment count
    const primAttachCount = wildcard.name === "Gunfighter" ? 8 : 5;
    const primGame = settings?.weapons
      ? getEnabledGames(settings.weapons.primary)
      : "";
    const secGame = settings?.weapons
      ? getEnabledGames(settings.weapons.secondary)
      : "";
    const meleeGame = settings?.weapons
      ? getEnabledGames(settings.weapons.melee)
      : "";

    const perks = fetchPerks(game);
    const weapons = {
      primary: {
        weapon: fetchWeapon("primary", primGame ? primGame : "black-ops-six"),
        attachments: "",
      },
      secondary: {
        weapon: fetchWeapon("secondary", secGame ? secGame : "black-ops-six"),
        attachments: "",
      },
      melee: fetchWeapon("melee", meleeGame ? meleeGame : "black-ops-six"),
    };
    //Get Primary Attachments
    //TODO: I think you can only get gunfighter for BO6 Weapons (8 attachments)
    weapons.primary.attachments = implodeObject(
      fetchAttachments(weapons.primary.weapon, primAttachCount)
    );
    //Check for overkill
    if (wildcard.name === "Overkill") {
      weapons.secondary.weapon = fetchWeapon(
        "primary",
        primGame ? primGame : "black-ops-six",
        weapons.primary.weapon.name
      );
    }
    //Verify if secondary weapon has attachments
    if (!weapons.secondary.weapon?.no_attach) {
      weapons.secondary.attachments = implodeObject(
        fetchAttachments(weapons.secondary.weapon)
      );
    }

    const equipment = {
      tactical: fetchEquipment("tactical", game),
      lethal: fetchEquipment("lethal", game),
    };

    setData({
      randClassName,
      perks,
      weapons,
      equipment,
      wildcard,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
}

export default WarzoneLoadout;
