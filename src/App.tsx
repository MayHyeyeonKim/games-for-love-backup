import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import 'maplibre-gl/dist/maplibre-gl.css';
import { FullscreenControl, Marker, NavigationControl, ScaleControl } from 'react-map-gl';
import Map from 'react-map-gl/maplibre';

import './App.css';
import { DASPopup } from './components/DASPopup';
import { PopupInfo } from './mapping/popupInfo';
import { HospitalInfo } from './mapping/hospitalInfo';

import { generalInfoService } from './mapping/generalInfoService';
import { hospitalInfoService } from './mapping/hospitalInfoService';
import { hospitalRequestService } from './mapping/hospitalRequestService';
import { hospitalFundedService } from './mapping/hospitalFundedService';

const MAP_HEIGHT = '100vh';

// Seattle
const DEFAULT_VIEW = {
  longitude: -122.4,
  latitude: 47.6061,
  zoom: 10
};

function App() {
  const [viewState, setViewState] = useState(DEFAULT_VIEW);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  const [hospitals, setHospitals] = useState<HospitalInfo[]>([]);

  useEffect(() => {
    hospitalInfoService.getHospitalInfo().then((res: HospitalInfo[]) => {
      const closedHospitals = res.filter(hospital => hospital.status === 'Closed');
      console.log("Closed Hospitals:", closedHospitals);
      setHospitals(closedHospitals);
    });
    generalInfoService.getGeneralInfo().then((res) => console.log(res));
    hospitalRequestService.getHospitalRequest().then((res) => console.log(res));
    hospitalFundedService.getHospitalFunded().then((res) => console.log(res));
  }, []);

  return (
    <Container sx={{ width: '100vw', height: '100vh' }}>
      <Grid container>
        <Grid item xs={12} lg={3}>
          <Paper style={{ maxHeight: MAP_HEIGHT, overflow: 'auto' }}>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={9}>
          <Box width={'75vw'} height={MAP_HEIGHT}>
            <Map
              {...viewState}
              onMove={evt => setViewState(evt.viewState)}
              mapStyle={`${import.meta.env.VITE_MAP_STYLE}?key=${import.meta.env.VITE_MAPTILER_API_KEY}`}
            >
              <FullscreenControl position="top-left" />
              <NavigationControl position="top-left" />
              <ScaleControl />
              {hospitals.map(hospital => (
                <Marker
                  key={hospital.name}
                  longitude={hospital.longitude}
                  latitude={hospital.latitude}
                  onClick={() => setPopupInfo({
                    hospitalInfo: hospital  
                    // name: hospital.name,
                    // status: hospital.status,
                    // type: hospital.type,
                    // description: hospital.description,
                    // year: hospital.year,
                    // country: hospital.country,
                    // state: hospital.state,
                    // zip: hospital.zip,
                    // city: hospital.city,
                    // address: hospital.address,
                    // longitude: hospital.longitude,
                    // latitude: hospital.latitude,
                    // hospitalPicture1: hospital.hospitalPicture1,
                    // hospitalPicture2: hospital.hospitalPicture2,
                    // hospitalPicture3: hospital.hospitalPicture3
                  })}
                />
              ))}
              {popupInfo && (
                <DASPopup
                  popupInfo={popupInfo}
                  onClose={() => setPopupInfo(null)}
                />
              )}
            </Map>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
