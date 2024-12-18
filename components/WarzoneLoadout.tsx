import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
//Helpers
import { implodeObject } from "../helpers/implodeObject";
import { fetchWeapon } from "../helpers/fetchWeapon";
import { fetchPerks } from "../helpers/fetchPerks";
import { fetchStreaks } from "../helpers/fetchStreaks";
import { fetchAttachments } from "@/helpers/fetchAttachments";
import { fetchEquipment } from "@/helpers/fetchEquipment";
import { fetchWildcard } from "@/helpers/fetchWildcard";
//Styles
import "../public/styles/components/Loadout.css";

function WarzoneLoadout() {
  const [containerClass, setContainerClass] = useState("hidden");
  const [data, setData] = useState({
    perks: null,
    primaryWeapon: { name: "", type: "", game: "", no_attach: false },
    p_attachments: "",
    secondaryWeapon: { name: "", type: "", game: "", no_attach: false },
    s_attachments: "",
    meleeWeapon: { name: "", type: "", game: "" },
    tacticalEquip: { name: "", type: "" },
    lethalEquip: { name: "", type: "" },
    wildcard: { name: "", type: "" },
  });

  useEffect(() => {
    fetchLoadoutData(setData, setContainerClass);
  }, []);

  const handleClick = async () => {
    await fetchLoadoutData(setData, setContainerClass);
  };

  const {
    perks,
    primaryWeapon,
    p_attachments,
    secondaryWeapon,
    s_attachments,
    meleeWeapon,
    tacticalEquip,
    lethalEquip,
    wildcard,
  } = data;

  return (
    <>
      <Container
        id="random-class"
        className={`${containerClass} shadow-lg p-3 bg-body rounded`}
      >
        <Row className="justify-content-md-center">
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Primary:</span> <br />
            <span className="text-muted fs-6">{primaryWeapon.name}</span>
            <br />
            {primaryWeapon.no_attach ? (
              <>
                <span className="fw-bolder fs-5">Primary Attachments: </span>
                <br />
                <span className="text-muted fs-6">No Attachments</span>
              </>
            ) : (
              <>
                <span className="fw-bolder fs-5">Primary Attachments:</span>
                <br />
                <span className="text-muted fs-6">{p_attachments}</span>
              </>
            )}
          </Col>
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Secondary:</span> <br />
            <span className="text-muted fs-6">{secondaryWeapon.name}</span>
            <br />
            {secondaryWeapon.no_attach ? (
              <>
                <span className="fw-bolder fs-5">Secondary Attachments: </span>
                <br />
                <span className="text-muted fs-6">No Attachments</span>
              </>
            ) : (
              <>
                <span className="fw-bolder fs-5">Secondary Attachments:</span>
                <br />
                <span className="text-muted fs-6">{s_attachments}</span>
              </>
            )}
          </Col>
          <Col sm className="text-center">
            <span className="fw-bolder fs-5">Melee:</span> <br />
            <span className="text-muted fs-6">{meleeWeapon.name}</span>
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-md-center">
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Tactical:</span> <br />
            <span className="text-muted fs-6">{tacticalEquip.name}</span>
          </Col>
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Lethal:</span> <br />
            <span className="text-muted fs-6">{lethalEquip.name}</span>
          </Col>
        </Row>
        <hr />
        <Row className="mb-5">
          <Col sm className="text-center mb-3 mb-md-0">
            <span className="fw-bolder fs-5">Perks:</span> <br />
            <span className="text-muted fs-6">{perks}</span>
          </Col>
          <Col sm className="text-center">
            <span className="fw-bolder fs-5">Wildcard:</span> <br />
            <span className="text-muted fs-6">{wildcard.name}</span>
          </Col>
        </Row>
        <Row id="button-row">
          <Col className="text-center">
            <Button variant="success" href="#" onClick={handleClick}>
              Generate Loadout
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

async function fetchLoadoutData(setData, setContainerClass) {
  try {
    const game = "warzone";
    let secondaryWeapon;
    let s_attachments;
    const wildcard = await fetchWildcard(game);
    //Figure out primary attachment count
    const primAttachCount = wildcard.name === "Gunfighter" ? 8 : 5;

    const perks = await fetchPerks(game);
    const primaryWeapon = await fetchWeapon("primary");
    //Get Primary Attachments
    const p_attachments = implodeObject(
      await fetchAttachments(primaryWeapon, primAttachCount)
    );
    //Check for overkill
    if (wildcard.name === "Overkill") {
      secondaryWeapon = await fetchWeapon("primary", "", primaryWeapon.name);
    } else {
      secondaryWeapon = await fetchWeapon("secondary");
    }
    //Verify if secondary weapon has attachments
    if (!secondaryWeapon.no_attach) {
      s_attachments = implodeObject(await fetchAttachments(secondaryWeapon));
    }
    const meleeWeapon = await fetchWeapon("melee");
    const tacticalEquip = await fetchEquipment("tactical", game);
    const lethalEquip = await fetchEquipment("lethal", game);

    setData({
      perks,
      primaryWeapon,
      p_attachments,
      secondaryWeapon,
      s_attachments,
      meleeWeapon,
      tacticalEquip,
      lethalEquip,
      wildcard,
    });
    setContainerClass("");
  } catch (error: any) {
    console.error(error.message); // Handle errors centrally
  }
}

export default WarzoneLoadout;
