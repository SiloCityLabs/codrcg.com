"use client";

import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import SimpleGeneratorView from "@/components/generators/cod/SimpleGeneratorView";
import PerkGreedGeneratorView from "@/components/generators/cod/PerkGreedGeneratorView";
import CodClassName from "@/components/CodClassName";
//Helpers
import { implodeObject } from "@/helpers/implodeObject";
import { scrollToTop } from "@/helpers/scrollToTop";
import { fetchWeapon } from "@/helpers/fetch/fetchWeapon";
import { fetchStreaks } from "@/helpers/fetch/fetchStreaks";
import { fetchEquipment } from "@/helpers/fetch/fetchEquipment";
import { fetchClassName } from "@/helpers/fetch/fetchClassName";
import { fetchSpecialist } from "@/helpers/fetch/fetchSpecialist";
//Ops 3
import { fetchPerk } from "@/helpers/generator/black-ops/three/fetchPerk";
import { getBO3Attachments } from "@/helpers/generator/black-ops/three/getBO3Attachments";
import { getLoadoutFrame } from "@/helpers/generator/black-ops/three/frame/getLoadoutFrame";
//Types
import { LoadoutFrame } from "@/types/BlackOps3";
//Utils
import { sendEvent } from "@/utils/gtag";
//json
import defaultData from "@/json/cod/default-generator-info.json";

const defaultWeapon = { name: "", type: "", game: "", no_attach: false };

export default function BlackOpsThreeLoadout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);
  const [data, setData] = useState(defaultData);

  useEffect(() => {
    fetchLoadoutData(setData);
    setIsGenerating(false);
    setIsLoading(false);
  }, []);

  const handleClick = async () => {
    setIsGenerating(true);

    setTimeout(() => {
      fetchLoadoutData(setData);
      setIsGenerating(false);
      scrollToTop();
    }, 1000);
  };

  const {
    randClassName,
    perkObj,
    streaks,
    weapons,
    equipment,
    wildcards,
    specialist,
  } = data;

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <CodClassName isGenerating={isGenerating} value={randClassName} />
      <Row className="justify-content-md-center">
        <Col sm className="text-center mb-3 mb-md-0">
          <SimpleGeneratorView
            isGenerating={isGenerating}
            title="Primary"
            value={
              weapons.primary.weapon.name ? weapons.primary.weapon.name : "None"
            }
          />
          <br />
          <SimpleGeneratorView
            isGenerating={isGenerating}
            title="Primary Optic"
            value={weapons.primary.optic ? weapons.primary.optic : "None"}
          />
          <br />
          <SimpleGeneratorView
            isGenerating={isGenerating}
            title="Primary Attachments"
            value={
              weapons.primary.attachments ? weapons.primary.attachments : "None"
            }
          />
        </Col>
        <Col sm className="text-center mb-3 mb-md-0">
          <SimpleGeneratorView
            isGenerating={isGenerating}
            title="Secondary"
            value={
              weapons.secondary.weapon.name
                ? weapons.secondary.weapon.name
                : "None"
            }
          />
          <br />
          <SimpleGeneratorView
            isGenerating={isGenerating}
            title="Secondary Optic"
            value={weapons.secondary.optic ? weapons.secondary.optic : "None"}
          />
          <br />
          <SimpleGeneratorView
            isGenerating={isGenerating}
            title="Secondary Attachments"
            value={
              weapons.secondary.attachments
                ? weapons.secondary.attachments
                : "None"
            }
          />
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-md-center">
        <Col sm className="text-center mb-3 mb-md-0">
          <SimpleGeneratorView
            isGenerating={isGenerating}
            title="Lethal"
            value={equipment.lethal.name ? equipment.lethal.name : "None"}
          />
        </Col>
        <Col sm className="text-center mb-3 mb-md-0">
          <SimpleGeneratorView
            isGenerating={isGenerating}
            title="Tactical"
            value={equipment.tactical.name ? equipment.tactical.name : "None"}
          />
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-md-center">
        <Col sm className="text-center">
          <PerkGreedGeneratorView
            isGenerating={isGenerating}
            title="Perk 1"
            perk={perkObj.perk1}
            perkGreed={perkObj.perk1Greed}
          />
        </Col>
        <Col sm className="text-center">
          <PerkGreedGeneratorView
            isGenerating={isGenerating}
            title="Perk 2"
            perk={perkObj.perk2}
            perkGreed={perkObj.perk2Greed}
          />
        </Col>
        <Col sm className="text-center">
          <PerkGreedGeneratorView
            isGenerating={isGenerating}
            title="Perk 3"
            perk={perkObj.perk3}
            perkGreed={perkObj.perk3Greed}
          />
        </Col>
      </Row>
      <hr />
      <Row className="mb-5">
        <Col sm className="text-center">
          <SimpleGeneratorView
            isGenerating={isGenerating}
            title="Specialist"
            value={specialist.name ? specialist.name : "None"}
          />
        </Col>
        <Col sm className="text-center">
          <SimpleGeneratorView
            isGenerating={isGenerating}
            title="Wildcards"
            value={wildcards ? wildcards : "None"}
          />
        </Col>
        <Col sm className="text-center">
          <SimpleGeneratorView
            isGenerating={isGenerating}
            title="Streaks"
            value={streaks}
          />
        </Col>
      </Row>
      <Row id="button-row">
        <Col className="text-center">
          <Button
            variant="black-ops"
            disabled={isGenerating}
            onClick={isGenerating ? undefined : handleClick}
          >
            {isGenerating ? "Generating Loadout..." : "Generate Loadout"}
          </Button>
        </Col>
      </Row>
    </>
  );
}

async function fetchLoadoutData(setData) {
  sendEvent("button_click", {
    button_id: "bo3_fetchLoadoutData",
    label: "BlackOpsThree",
    category: "COD_Loadouts",
  });

  try {
    const loadoutFrame: LoadoutFrame = getLoadoutFrame();
    const game = "black-ops-three";
    const randClassName = fetchClassName();
    const secondaryNeedsAttach =
      loadoutFrame.secondary_optic || loadoutFrame.secondary_attach > 0
        ? true
        : false;

    const initialPerks = {
      perk1: loadoutFrame.perk1 ? fetchPerk("perk1") : "",
      perk2: loadoutFrame.perk2 ? fetchPerk("perk2") : "",
      perk3: loadoutFrame.perk3 ? fetchPerk("perk3") : "",
    };

    const perkGreed = {
      perk1Greed: loadoutFrame.perk1Greed
        ? fetchPerk("perk1", initialPerks.perk1)
        : "",
      perk2Greed: loadoutFrame.perk2Greed
        ? fetchPerk("perk2", initialPerks.perk2)
        : "",
      perk3Greed: loadoutFrame.perk3Greed
        ? fetchPerk("perk3", initialPerks.perk3)
        : "",
    };

    const perkObj = { ...initialPerks, ...perkGreed };

    const streaks = fetchStreaks(game);
    const weapons = {
      primary: {
        weapon: loadoutFrame.primary
          ? fetchWeapon("primary", game)
          : defaultWeapon,
        optic: "",
        attachments: "",
      },
      secondary: {
        weapon: loadoutFrame.secondary
          ? fetchWeapon("secondary", game, "", secondaryNeedsAttach)
          : defaultWeapon,
        optic: "",
        attachments: "",
      },
    };

    if (loadoutFrame.primary_optic) {
      weapons.primary.optic = getBO3Attachments(
        weapons.primary.weapon,
        "optic"
      )[0];
    }

    //Get Primary Attachments
    if (
      !weapons.primary.weapon?.no_attach &&
      loadoutFrame?.primary_attach > 0
    ) {
      weapons.primary.attachments = implodeObject(
        getBO3Attachments(
          weapons.primary.weapon,
          "attachments",
          loadoutFrame.primary_attach
        )
      );
    }

    //Check for overkill
    if (loadoutFrame.overkill) {
      weapons.secondary.weapon = fetchWeapon(
        "primary",
        game,
        weapons.primary.weapon.name
      );
    }

    if (!weapons.secondary.weapon?.no_attach && loadoutFrame.secondary_optic) {
      weapons.secondary.optic = getBO3Attachments(
        weapons.secondary.weapon,
        "optic"
      )[0];
    }

    //Verify if secondary weapon has attachments
    if (
      !weapons.secondary.weapon?.no_attach &&
      loadoutFrame.secondary_attach > 0
    ) {
      weapons.secondary.attachments = implodeObject(
        getBO3Attachments(
          weapons.secondary.weapon,
          "attachments",
          loadoutFrame.secondary_attach
        )
      );
    }

    const lethalType = loadoutFrame.tactician ? "tactical" : "lethal";

    const equipment = {
      tactical:
        loadoutFrame.tactical > 0
          ? fetchEquipment("tactical", game)
          : {
              name: "",
              type: "",
            },
      lethal:
        loadoutFrame.lethal || loadoutFrame.tactician
          ? fetchEquipment(lethalType, game)
          : {
              name: "",
              type: "",
            },
    };
    //Check for x2 tacticals
    equipment.tactical.name +=
      loadoutFrame.tactical === 2 && !equipment.tactical.name.includes("x2")
        ? " x2"
        : "";
    //Check for danger close
    equipment.lethal.name +=
      (loadoutFrame.dangerClose || loadoutFrame.tactician === 2) &&
      !equipment.lethal.name.includes("x2")
        ? " x2"
        : "";

    const wildcards = loadoutFrame?.wildcards.join(", ");
    const specialist = fetchSpecialist(game);

    setData({
      randClassName,
      perkObj,
      streaks,
      weapons,
      equipment,
      wildcards,
      specialist,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("An unknown error occurred.");
    }
  }
}
