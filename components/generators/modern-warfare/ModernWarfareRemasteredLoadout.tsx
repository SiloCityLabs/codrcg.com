import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CodPlaceholder from "@/components/CodPlaceholder";
//Helpers
import { implodeObject } from "@/helpers/implodeObject";
import { fetchWeapon } from "@/helpers/fetch/fetchWeapon";
import { fetchEquipment } from "@/helpers/fetch/fetchEquipment";
import { fetchClassName } from "@/helpers/fetch/fetchClassName";
//MWR Specific
import { fetchAttachments } from "@/helpers/generator/modern-warfare/remastered/fetchAttachments";
import { fetchPerk } from "@/helpers/generator/modern-warfare/remastered/fetchPerk";
//Utils
import { sendEvent } from "@/utils/gtag";

function ModernWarfareRemasteredLoadout() {
  const [containerClass, setContainerClass] = useState("hidden");
  const [isGenerating, setIsGenerating] = useState(true);
  const [data, setData] = useState({
    randClassName: "",
    perks: {
      perk1: "",
      perk2: "",
      perk3: "",
    },
    weapons: {
      primary: {
        weapon: { name: "", type: "", game: "", no_attach: false },
        attachments: "",
      },
      secondary: {
        weapon: { name: "", type: "", game: "", no_attach: false },
        attachments: "",
      },
      melee: { name: "", type: "", game: "" },
    },
    equipment: {
      tactical: { name: "", type: "" },
    },
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

  const { randClassName, perks, weapons, equipment } = data;

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
            <span className="fw-bolder fs-5">Side Arm:</span> <br />
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
          <Col sm className="text-center">
            <span className="fw-bolder fs-5">Melee:</span> <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={weapons.melee.name} />
            </span>
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-md-center mb-4">
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Tactical:</span> <br />
            <span className="text-muted fs-6"><CodPlaceholder isLoading={isGenerating} value={equipment.tactical.name} /></span>
          </Col>
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Perk 1:</span> <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={perks.perk1 ? perks.perk1 : "None"} />
            </span>
          </Col>
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Perk 2:</span> <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={perks.perk2 ? perks.perk2 : "None"} />
            </span>
          </Col>
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Perk 3:</span> <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={perks.perk3 ? perks.perk3 : "None"} />
            </span>
          </Col>
        </Row>
        <Row id="button-row">
          <Col className="text-center">
            <Button
              variant="success"
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
    button_id: "mwr_fetchLoadoutData",
    label: "ModernWarfareRemastered",
    category: "COD_Loadouts",
  });

  try {
    const game = "modern-warfare-remastered";
    const randClassName = fetchClassName();
    const perks = {
      perk1: fetchPerk("perk1"),
      perk2: fetchPerk("perk2"),
      perk3: fetchPerk("perk3"),
    };
    let equipment = {
      tactical: fetchEquipment("tactical", game),
    };

    let weapons = {
      primary: {
        weapon: fetchWeapon("primary", game),
        attachments: "",
      },
      secondary: {
        weapon: fetchWeapon("secondary", game),
        attachments: "",
      },
      melee: fetchWeapon("melee", game),
    };

    weapons.primary.attachments = implodeObject(
      fetchAttachments(weapons.primary.weapon, 1)
    );

    if (perks.perk2 === "Overkill") {
      weapons.secondary.weapon = fetchWeapon(
        "primary",
        game,
        weapons.primary.weapon.name
      );
    }

    //Verify if secondary weapon has attachments
    if (!weapons.secondary.weapon?.no_attach) {
      weapons.secondary.attachments = implodeObject(
        fetchAttachments(weapons.secondary.weapon, 1)
      );
    }

    setData({
      randClassName,
      perks,
      weapons,
      equipment,
    });
    setContainerClass("");
  } catch (error: any) {
    console.error(error.message); // Handle errors centrally
  }
}

export default ModernWarfareRemasteredLoadout;
