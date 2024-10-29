/**
 *  App.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import { Box, Grid } from "@mui/material";
import "maplibre-gl/dist/maplibre-gl.css";
import { useContext, useEffect, useState } from "react";
import { GFLMap } from "./components/GFLMap";
import { HospitalCardDetails } from "./components/HospitalCardDetails";
import { SearchAndSort } from "./components/SearchAndSort";

import "./App.css";

import { FilterType } from "./types/fillterType";
import { SelectedHospitalsContextProvider } from "./context/SelectedHospitalContext";
import { hospitalService } from "./services/hospital/hospitalService";
import { Hospital } from "./models/hospital";
import { HospitalsContext } from "./context/HospitalContext";

const HospitalList = () => {
  const { hospitals } = useContext(HospitalsContext);
  return hospitals?.map((hospital, idx: number) => (
    <HospitalCardDetails key={`h-${idx})`} hospital={hospital} />
  ));
};

function App() {
  const { hospitals, setOriginals } = useContext(HospitalsContext);
  const [windowHeight, setWindowHeight] = useState<number>(400);

  const getCombinedHospital = async (filter?: FilterType) => {
    const _hospitals: Hospital[] | undefined =
      await hospitalService.combineHospitalInfoAndFundedAndRequest(filter);

    setOriginals(_hospitals);
  };

  useEffect(() => {
    getCombinedHospital(); //getCombinedHospital 호출해 병원 데이터
    setWindowHeight(window.innerHeight); //현재 창 높이로 설정

    function handleResize() {
      setWindowHeight(window.innerHeight);
    }
    window.addEventListener("resize", handleResize); //이벤트 타입으로, 어떤 종류의 이벤트를 감지할지를 지정, handleResize는 이벤트 리스너 함수로, "resize" 이벤트가 발생할 때 실행할 콜백 함수
  }, []);
  console.log("HOSPITALS", hospitals);

  return (
    <SelectedHospitalsContextProvider>
      {" "}
      {/* 선택된 병원 데이터를 접근하고 조작하게 감싸줌 */}
      <Grid container>
        <Grid item xs={12} lg={7}>
          <Box sx={{ height: windowHeight, overflowY: "auto" }}>
            <Box padding={1}>
              <SearchAndSort />
            </Box>
            <Box padding={1} data-testid="hospital-list">
              <HospitalList />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={5}>
          <Box height={windowHeight} data-testid="gfl-map-box">
            <GFLMap />
          </Box>
        </Grid>
      </Grid>
    </SelectedHospitalsContextProvider>
  );
}

export default App;
