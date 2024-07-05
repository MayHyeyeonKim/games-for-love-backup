import { Box, Container, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Stack } from '@mui/material';
import 'maplibre-gl/dist/maplibre-gl.css';
import { ReactNode, useEffect, useState } from 'react';
import { FullscreenControl, Marker, NavigationControl, ScaleControl } from 'react-map-gl';
import Map from 'react-map-gl/maplibre';

import './App.css';
import { DASPopup } from './components/DASPopup';
import { PopupInfo } from './mapping/popuInfo';

import { generalInfoService } from './mapping/generalInfoService';
import { hospitalInfoService } from './mapping/hospitalInfoService';
import { hospitalRequestService } from './mapping/hospitalRequestService';
import { hospitalFundedService } from './mapping/hospitalFundedService';


const MAP_HEIGHT = '100vh';

// Seattle
const DEFAULT_VIEW = {
  longitude: -122.4,
  latitude: 47.6061,
  zoom: 7
}

function App() {
  const [viewState, setViewState] = useState(DEFAULT_VIEW);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);


  useEffect(() => {
    hospitalInfoService.getHospitalInfo().then((res) => console.log(res));
    generalInfoService.getGeneralInfo().then((res) => console.log(res));
    hospitalRequestService.getHospitalRequest().then((res) => console.log(res));
    hospitalFundedService.getHospitalFunded().then((res) => console.log(res));
  }, []);

  useEffect(() => {
    Promise
      .all([
        hospitalInfoService.getHospitalInfo(),
        generalInfoService.getGeneralInfo(),
        hospitalRequestService.getHospitalRequest(),
        hospitalFundedService.getHospitalFunded()
      ])
      .then(resps => {
        console.log("res[0]",resps[0]);
        console.log("res[1]", resps[1]);
        console.log("res[2]", resps[2]);
        console.log("res[3]", resps[3]);
      });
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
              <DASPopup popupInfo={popupInfo} onClose={() => setPopupInfo(null)} />
            </Map>
          </Box>
        </Grid>
      </Grid>
    </Container >
  )
}

export default App
