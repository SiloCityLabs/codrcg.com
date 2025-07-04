'use client';

import { useEffect, useState } from 'react';
import { Row, Col, Tabs, Tab, Button } from 'react-bootstrap';
// --- Components ---
import { CustomAlert } from '@silocitypages/ui-core';
import Warzone from '@/components/settings/Warzone';
// --- DB ---
import getAllSettings from '@/helpers/database/settings/getAllSettings';
import saveSettings from '@/helpers/database/settings/saveSettings';
import { useDatabase } from '@/contexts/DatabaseContext';
//Types
import type { sclSettings } from '@silocitypages/ui-core';

// Define outside component if static
const warzoneGames = [
  { key: 'black-ops-six', value: 'Black Ops 6' },
  { key: 'modern-warfare-three-wz', value: 'Modern Warfare 3' },
];

export default function SettingsTabs() {
  const [key, setKey] = useState<string>('warzone');
  const { dbs, isReady } = useDatabase();
  const [data, setData] = useState<sclSettings>({});
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (dbs.settings) {
        setIsLoading(true);
        try {
          let allData: sclSettings | null = await getAllSettings(dbs.settings);

          // Initialize default structure if DB is empty or lacks necessary keys
          if (!allData) {
            allData = {};
          }
          if (!allData.warzone) {
            allData.warzone = {};
          }
          if (!allData.warzone.weapons) {
            allData.warzone.weapons = { primary: {}, secondary: {}, melee: {} };
            warzoneGames.forEach((game) => {
              // Use non-null assertion (!) carefully, ensure object exists
              allData!.warzone!.weapons!.primary[game.key] = false;
              allData!.warzone!.weapons!.secondary[game.key] = false;
              allData!.warzone!.weapons!.melee[game.key] = false;
            });
          } else {
            const weaponTypes = ['primary', 'secondary', 'melee'] as const;
            weaponTypes.forEach((type) => {
              if (!allData.warzone!.weapons![type]) {
                allData.warzone!.weapons![type] = {};
              }
              warzoneGames.forEach((game) => {
                if (allData!.warzone!.weapons![type][game.key] === undefined) {
                  allData!.warzone!.weapons![type][game.key] = false;
                }
              });
            });
          }

          setData(allData);
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to fetch settings.';
          console.error('Error fetching settings:', err);
          setAlertVariant('danger');
          setAlertMessage(errorMessage);
          setShowAlert(true);
          setData({});
        } finally {
          setIsLoading(false);
        }
      } else {
        if (!isReady) setIsLoading(true);
        else setIsLoading(false);
      }
    }

    if (isReady) {
      fetchData();
    } else {
      setIsLoading(true);
    }
  }, [dbs, isReady]);

  const save = async () => {
    if (!dbs.settings) {
      console.error('Database is not initialized.');
      setAlertVariant('danger');
      setAlertMessage('Database is not initialized.');
      setShowAlert(true);
      return;
    }

    setIsSpinning(true);
    setShowAlert(false); // Hide previous alert before saving

    try {
      await saveSettings(dbs.settings, data);
      setAlertVariant('success');
      setAlertMessage('Settings Saved!');
      setShowAlert(true);
    } catch (error: unknown) {
      console.error('Error saving settings:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred while saving settings.';
      setAlertVariant('danger');
      setAlertMessage(errorMessage);
      setShowAlert(true);
    } finally {
      setIsSpinning(false);
    }
  };

  const handleWarzoneDataChange = (updatedData: sclSettings) => {
    setData(updatedData);
  };

  if (isLoading) {
    return <div className='text-center p-5'>Loading Settings...</div>;
  }

  if (!isLoading && !dbs.settings) {
    return <div className='text-center p-5 text-danger'>Loading...</div>;
  }

  return (
    <>
      <CustomAlert
        variant={alertVariant}
        message={alertMessage}
        show={showAlert}
        onClose={() => setShowAlert(false)}
      />
      <Tabs activeKey={key} onSelect={(k) => setKey(k ?? 'warzone')} className='mb-3'>
        <Tab eventKey='warzone' title='Warzone'>
          <Warzone
            settingsData={data} // Pass the current state data
            onDataChange={handleWarzoneDataChange} // Pass the callback
          />
        </Tab>
      </Tabs>
      <Row className='mt-5 justify-content-center'>
        <Col xs={12} sm={6} md={3}>
          <div className='d-flex justify-content-center'>
            <Button
              variant='success'
              className='w-100'
              disabled={isSpinning || isLoading} // Disable if loading or saving
              onClick={save}>
              {isSpinning ? 'Saving...' : 'Save Settings'}
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
}
