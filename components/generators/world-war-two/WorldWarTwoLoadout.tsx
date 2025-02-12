import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CodPlaceholder from "@/components/CodPlaceholder";
//Helpers
import { implodeObject } from "@/helpers/implodeObject";
import { fetchWeapon } from "@/helpers/fetch/fetchWeapon";
import { fetchStreaks } from "@/helpers/fetch/fetchStreaks";
import { fetchAttachments } from "@/helpers/fetch/fetchAttachments";
import { fetchEquipment } from "@/helpers/fetch/fetchEquipment";
import { fetchClassName } from "@/helpers/fetch/fetchClassName";
//World War Two
import { fetchPerk } from "@/helpers/generator/world-war-two/fetchPerk";
//Utils
import { sendEvent } from "@/utils/gtag";

function WorldWarTwoLoadout() {
  const [containerClass, setContainerClass] = useState("hidden");
  const [isGenerating, setIsGenerating] = useState(true);
  const [data, setData] = useState({
    randClassName: "",
    streaks: null,
    weapons: {
      primary: {
        weapon: { name: "", type: "", game: "", no_attach: false },
        attachments: "",
      },
      secondary: {
        weapon: { name: "", type: "", game: "", no_attach: false },
        attachments: "",
      },
    },
    equipment: {
      tactical: { name: "", type: "" },
      lethal: { name: "", type: "" },
    },
    division: "",
    basic: "",
  });

  useEffect(() => {
    fetchLoadoutData(setData, setContainerClass);
    setIsGenerating(false);
  }, []);

  const handleClick = async () => {
    setIsGenerating(true);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    setTimeout(() => {
      fetchLoadoutData(setData, setContainerClass);
      setIsGenerating(false);
    }, 1000);
  };

  const { randClassName, streaks, weapons, equipment, division, basic } = data;

  return (
    <>
      <Container
        id="random-class"
        className={`${containerClass} shadow-lg p-3 bg-body rounded`}
      >
        {!isGenerating && (
          <>
            <h3 className="text-center">&ldquo;{randClassName}&rdquo;</h3>
            <hr />
          </>
        )}
        <Row className="justify-content-md-center">
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Primary:</span> <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={weapons.primary.weapon.name} />
            </span>
            <br />
            <span className="fw-bolder fs-5">Primary Attachments:</span>
            <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={weapons.primary.weapon.no_attach ? "No Attachments" : weapons.primary.attachments} />
            </span>
          </Col>
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Secondary:</span> <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={weapons.secondary.weapon.name} />
            </span>
            <br />
            <span className="fw-bolder fs-5">Secondary Attachments:</span>
            <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={weapons.secondary.weapon.no_attach ? "No Attachments" : weapons.secondary.attachments} />
            </span>
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-md-center">
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Tactical:</span> <br />
            <span className="text-muted fs-6">
              <CodPlaceholder
                isLoading={isGenerating}
                value={
                  equipment.tactical.name +
                  (basic === "Serrated" || basic === "Concussed" ? " x2" : "")
                }
              />
            </span>
          </Col>
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Lethal:</span> <br />
            <span className="text-muted fs-6">
              <CodPlaceholder
                isLoading={isGenerating}
                value={
                  equipment.lethal.name +
                  (basic === "Saboteur" || basic === "Concussed" ? " x2" : "")
                }
              />
            </span>
          </Col>
        </Row>
        <hr />
        <Row className="mb-5">
          <Col sm className="text-center">
            <span className="fw-bolder fs-5">Division:</span> <br />
            <span className="text-muted fs-6"><CodPlaceholder isLoading={isGenerating} value={division} /></span>
          </Col>
          <Col sm className="text-center">
            <span className="fw-bolder fs-5">Basic Training:</span> <br />
            <span className="text-muted fs-6"><CodPlaceholder isLoading={isGenerating} value={basic} /></span>
          </Col>
          <Col sm className="text-center">
            <span className="fw-bolder fs-5">Streaks:</span> <br />
            <span className="text-muted fs-6"><CodPlaceholder isLoading={isGenerating} value={streaks} /></span>
          </Col>
        </Row>
        <Row id="button-row">
          <Col className="text-center">
            <Button
              variant="ww2"
              disabled={isGenerating}
              onClick={isGenerating ? undefined : handleClick}
            >
              {isGenerating ? 'Generating Loadout...' : 'Generate Loadout'}
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

async function fetchLoadoutData(setData, setContainerClass) {
  sendEvent("button_click", {
    button_id: "ww2_fetchLoadoutData",
    label: "WorldWarTwo",
    category: "COD_Loadouts",
  });

  try {
    const game = "world-war-two";
    const randClassName = fetchClassName();
    const division = fetchPerk("division");
    let basic = fetchPerk("basic-training");
    const secondaryNeedsAttach = basic === "Shifty" ? true : false;
    const isBlitzkrieg = basic === "Blitzkrieg" ? true : false;
    let streaks = fetchStreaks(game, isBlitzkrieg);
    let primAttactCount = division === "Infantry" ? 4 : 3;
    let secondaryAttactCount = division === "Infantry" ? 2 : 1;

    let weapons = {
      primary: {
        weapon: fetchWeapon("primary", game),
        attachments: "",
      },
      secondary: {
        weapon: fetchWeapon("secondary", game, "", secondaryNeedsAttach),
        attachments: "",
      },
    };

    let equipment = {
      tactical: fetchEquipment("tactical", game),
      lethal: fetchEquipment("lethal", game),
    };

    if (division === "Commando") {
      equipment = {
        tactical: {
          name: "Paratrooper Insert",
          type: "Special",
          game: "world-war-two",
        },
        lethal: fetchEquipment("lethal_tactical", game),
      };
    } else if (division === "Cavalry") {
      primAttactCount = 0;
      secondaryAttactCount = 0;

      //Cavalry
      weapons.primary.weapon = {
        name: "Cavalry Shield",
        type: "Shield",
        game: "world-war-two",
        no_attach: true,
      };

      //Secondary can be all attachments
      weapons.secondary.weapon = fetchWeapon("all", game);
      (weapons.secondary.weapon ?? {}).no_attach = true;
    }

    //Check for overkill
    if (basic === "Wanderlust") {
      weapons.primary.weapon = {
        name: "Random Weapon",
        type: "random",
        game: "world-war-two",
        no_attach_info: true,
      };
      primAttactCount = 6;
    } else if (basic === "Duelist") {
      weapons.secondary.weapon = {
        name: "Akimbo Pistols",
        type: "pistol",
        game: "world-war-two",
        no_attach: true,
      };
    } else if (basic === "Rifleman") {
      weapons.secondary.weapon = fetchWeapon(
        "primary",
        game,
        weapons.primary.weapon.name
      );

      (weapons.secondary.weapon ?? {}).no_attach = true;
    } else if (basic === "Serrated") {
      equipment.lethal = {
        name: "Throwing Knives x2",
        type: "Lethal",
        game: "world-war-two",
      };

      weapons.primary.weapon = fetchWeapon(
        "melee",
        game,
        weapons.secondary.weapon.name
      );
    } else if (basic === "Danger Close") {
      equipment.lethal = {
        name: "Frag x3",
        type: "Lethal",
        game: "world-war-two",
      };
    } else if (basic === "Stun X3") {
      equipment.tactical = {
        name: "British N 69 x3",
        type: "Lethal",
        game: "world-war-two",
      };
    } else if (basic === "Shifty") {
      secondaryAttactCount = 3;
    } else if (basic === "Specialist") {
      const special1 = fetchPerk("basic-training");
      const special2 = fetchPerk("basic-training", [special1]);
      const special3 = fetchPerk("basic-training", [special1, special2]);

      streaks = `200: ${special1}, 400: ${special2}, 600: ${special3}, 800: All Perks`;
    }

    //Get Primary Attachments
    if (!weapons.primary.weapon?.no_attach) {
      weapons.primary.attachments = implodeObject(
        fetchAttachments(weapons.primary.weapon, primAttactCount)
      );
    }

    //Verify if secondary weapon has attachments
    if (!weapons.secondary.weapon?.no_attach) {
      weapons.secondary.attachments = implodeObject(
        fetchAttachments(weapons.secondary.weapon, secondaryAttactCount)
      );
    }

    setData({
      randClassName,
      streaks,
      weapons,
      equipment,
      division,
      basic,
    });
    setContainerClass("");
  } catch (error: any) {
    console.error(error.message); // Handle errors centrally
  }
}

export default WorldWarTwoLoadout;
