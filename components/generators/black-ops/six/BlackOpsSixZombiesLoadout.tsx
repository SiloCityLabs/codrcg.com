import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
//Helpers
import { implodeObject } from "@/helpers/implodeObject";
import { setLocalStorage, getLocalStorage } from "@/helpers/localStorage";
import { fetchWeapon } from "@/helpers/fetch/fetchWeapon";
import { fetchAttachments } from "@/helpers/fetch/fetchAttachments";
import { fetchEquipment } from "@/helpers/fetch/fetchEquipment";
import { fetchClassName } from "@/helpers/fetch/fetchClassName";
//Zombies Specific
import { fetchZombiesAmmoMod } from "@/helpers/fetch/zombies/fetchZombiesAmmoMod";
import { fetchZombiesMap } from "@/helpers/fetch/zombies/fetchZombiesMap";
import { fetchZombiesGobblegum } from "@/helpers/fetch/zombies/fetchZombiesGobblegum";
import { fetchZombiesAugments } from "@/helpers/fetch/zombies/fetchZombiesAugments";
//Types
import { Bo6ZombiesSettings } from "@/types/Generator";
//Components
import CustomModal from "@/components/bootstrap/CustomModal";
import CodPlaceholder from "@/components/CodPlaceholder";
//Utils
import { sendEvent } from "@/utils/gtag";

const defaultSettings: Bo6ZombiesSettings = {
  rollMap: true,
  rollGobblegum: true,
  rollAugments: true,
};

function BlackOpsSixZombiesLoadout() {
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(true);
  const [containerClass, setContainerClass] = useState("hidden");
  //Settings
  const [settings, setSettings] = useState<Bo6ZombiesSettings>(defaultSettings);
  const [rollMap, setRollMap] = useState(settings.rollMap);
  const [rollAugments, setRollAugments] = useState(settings.rollAugments);
  const [rollGobblegum, setRollGobblegum] = useState(settings.rollGobblegum);
  const [showModal, setShowModal] = useState(false);

  //Data
  const [data, setData] = useState({
    randClassName: "",
    weapons: {
      primary: {
        weapon: { name: "", type: "", game: "", no_attach: false },
        attachments: "",
        ammoMod: "",
      },
      melee: { name: "", type: "", game: "" },
    },
    equipment: {
      tactial: { name: "", type: "" },
      lethal: { name: "", type: "" },
      fieldUpgrade: { name: "", type: "" },
    },
    gobblegum: "",
    zombieMap: "",
    augments: { "0": { name: "", major: "", minor: "" } },
  });

  useEffect(() => {
    const storedSettings = getLocalStorage("bo6ZombiesSettings") ?? settings;
    const completeSettings = { ...defaultSettings, ...storedSettings };

    setSettings(completeSettings);
    setRollMap(completeSettings.rollMap);
    setRollGobblegum(completeSettings.rollGobblegum);
    setRollAugments(completeSettings.rollAugments);

    fetchLoadoutData(setData, setContainerClass);

    setIsLoading(false);
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

  const handleModal = () => setShowModal(!showModal);
  const handleSave = () => {
    setLocalStorage("bo6ZombiesSettings", settings);
    handleModal();
  };

  const handleRollMapChange = (event) => {
    setRollMap(event.target.checked);
    setSettings({
      ...settings,
      rollMap: event.target.checked,
    });
  };
  const handleRollGobblegumChange = (event) => {
    setRollGobblegum(event.target.checked);
    setSettings({
      ...settings,
      rollGobblegum: event.target.checked,
    });
  };
  const handleRollAugmentsChange = (event) => {
    setRollAugments(event.target.checked);
    setSettings({
      ...settings,
      rollAugments: event.target.checked,
    });
  };

  const { randClassName, weapons, equipment, gobblegum, zombieMap, augments } =
    data;

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

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
        <Row className="justify-content-md-center mb-4">
          <Col xs md="8" lg="6" className="text-center">
            <span className="fw-bolder fs-5">Primary:</span> <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={weapons.primary.weapon.name} />
            </span>
            <br />
            <span className="fw-bolder fs-5">Ammo Mod:</span>
            <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={weapons.primary.ammoMod} />
            </span>
            <br />
            {weapons.primary.weapon.no_attach ? (
              <>
                <span className="fw-bolder fs-5">Primary Attachments: </span>
                <br />
                <span className="text-muted fs-6">No Attachments</span>
              </>
            ) : (
              <>
                <span className="fw-bolder fs-5">Primary Attachments:</span>
                <br />
                <span className="text-muted fs-6">
                  <CodPlaceholder isLoading={isGenerating} value={weapons.primary.attachments} />
                </span>
              </>
            )}
          </Col>
        </Row>
        <hr />
        <Row className="justify-content-md-center mb-4">
          <Col xs={6} sm={6} md="3" lg="3" className="text-center">
            <span className="fw-bolder fs-5">Melee:</span> <br />
            <span className="text-muted fs-6">

              <CodPlaceholder isLoading={isGenerating} value={weapons.melee.name} />
            </span>
          </Col>
          <Col xs={6} sm={6} md="3" lg="3" className="text-center">
            <span className="fw-bolder fs-5">Field Upgrade:</span> <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={equipment.fieldUpgrade.name} />
            </span>
          </Col>
          <Col xs={6} md="3" lg="3" className="text-center">
            <span className="fw-bolder fs-5">Tactical:</span> <br />
            <span className="text-muted fs-6">
              <CodPlaceholder isLoading={isGenerating} value={equipment.tactial.name} />
            </span>
          </Col>
          <Col xs={6} md="3" lg="3" className="text-center">
            <span className="fw-bolder fs-5">Lethal:</span> <br />
            <span className="text-muted fs-6"><CodPlaceholder isLoading={isGenerating} value={equipment.lethal.name} /></span>
          </Col>
        </Row>
        {(rollGobblegum || rollMap) && <hr />}
        <Row className="justify-content-md-center mb-4">
          {rollGobblegum && (
            <Col xs md="4" lg="3" className="text-center">
              <span className="fw-bolder fs-5">Gobblegum:</span> <br />
              <span className="text-muted fs-6"><CodPlaceholder isLoading={isGenerating} value={gobblegum} /></span>
            </Col>
          )}
          {rollMap && (
            <Col xs md="4" lg="3" className="text-center">
              <span className="fw-bolder fs-5">Map:</span> <br />
              <span className="text-muted fs-6">
                <CodPlaceholder isLoading={isGenerating} value={zombieMap} />
              </span>
            </Col>
          )}
        </Row>
        {rollAugments && (
          <>
            <hr />
            <Row className="mb-4">
              {Object.values(augments).map((item) => (
                <Col
                  key={item?.name}
                  xs={12}
                  md="4"
                  lg="3"
                  className="text-center mb-3"
                >
                  <span className="fw-bolder fs-5">{item?.name}:</span>
                  <br />
                  <span className="text-muted fs-6">
                    <span className="fw-bolder">Major Augment:</span>{" "}
                    <CodPlaceholder isLoading={isGenerating} value={item?.major} />
                  </span>
                  <br />
                  <span className="text-muted fs-6">
                    <span className="fw-bolder">Minor Augment:</span>{" "}
                    <CodPlaceholder isLoading={isGenerating} value={item?.minor} />
                  </span>
                </Col>
              ))}
            </Row>
          </>
        )}
        <Row className="justify-content-md-center">
          <Col xs md="8" lg="6" className="text-center">
            <div className="d-flex justify-content-center">
              <Button
                variant="black-ops"
                disabled={isGenerating}
                onClick={isGenerating ? undefined : handleModal}
                className="w-50 me-2"
              >
                Settings
              </Button>
              <Button
                variant="black-ops"
                className="w-50 me-2"
                disabled={isGenerating}
                onClick={isGenerating ? undefined : handleClick}
              >
                {isGenerating ? 'Generating Loadout...' : 'Generate Loadout'}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>

      <CustomModal
        variant="black-ops"
        show={showModal}
        onClose={handleModal}
        onSave={handleSave}
        title="Settings"
      >
        <Row>
          <Col>
            <Form.Label htmlFor="rollMap">Roll Map:</Form.Label>
            <Form.Check
              type="switch"
              id="rollMap"
              onChange={handleRollMapChange}
              checked={rollMap}
            />
          </Col>
          <Col>
            <Form.Label htmlFor="rollGobblegum">Roll Gobblegum:</Form.Label>
            <Form.Check
              type="switch"
              id="rollGobblegum"
              onChange={handleRollGobblegumChange}
              checked={rollGobblegum}
            />
          </Col>
          <Col>
            <Form.Label htmlFor="rollAugments">Roll Augments:</Form.Label>
            <Form.Check
              type="switch"
              id="rollAugments"
              onChange={handleRollAugmentsChange}
              checked={rollAugments}
            />
          </Col>
        </Row>
      </CustomModal>
    </>
  );
}

async function fetchLoadoutData(setData, setContainerClass) {
  sendEvent("button_click", {
    button_id: "bo6Zombies_fetchLoadoutData",
    label: "BlackOpsSixZombies",
    category: "COD_Loadouts",
  });

  try {
    const game = "black-ops-six-zombies";
    const randClassName = fetchClassName();
    const weapons = {
      primary: {
        weapon: fetchWeapon("all", "black-ops-six"),
        attachments: "",
        ammoMod: fetchZombiesAmmoMod("black-ops-six"),
      },
      melee: fetchWeapon("melee", "black-ops-six"),
    };
    //Get Primary Attachments
    if (!weapons.primary.weapon.no_attach) {
      weapons.primary.attachments = implodeObject(
        fetchAttachments(weapons.primary.weapon, 8)
      );
    }
    const equipment = {
      tactial: fetchEquipment("tactical", game),
      lethal: fetchEquipment("lethal", game),
      fieldUpgrade: fetchEquipment("field_upgrade", game),
    };
    const gobblegum = fetchZombiesGobblegum(game);
    const zombieMap = fetchZombiesMap(game).name;
    const augments = fetchZombiesAugments(game);

    setData({
      randClassName,
      weapons,
      equipment,
      gobblegum,
      zombieMap,
      augments,
    });
    setContainerClass("");
  } catch (error: any) {
    console.error(error.message); // Handle errors centrally
  }
}

export default BlackOpsSixZombiesLoadout;
