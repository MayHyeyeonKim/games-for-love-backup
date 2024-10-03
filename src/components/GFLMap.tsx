import {
  FullscreenControl,
  Marker,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import Map from "react-map-gl/maplibre";
import { PopupInfo } from "../models/popupInfo";
import { GFLPopup } from "./GFLPopup";

import { useContext, useState } from "react";
import { Box } from "@mui/material";
import { siteService } from "../services/siteUtils";
import { HospitalsContext } from "../context/HospitalsContext";
import { OPEN_MARKER_COLOR, CLOSED_MARKER_COLOR } from "../../src/styles/theme";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export const GFLMap = () => {
  const { hospitals, selectedHospital } = useContext(HospitalsContext);
  const [viewState, setViewState] = useState(siteService.DEFAULT_VIEW);
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null);
  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle={`${import.meta.env.VITE_MAP_STYLE}?key=${
        import.meta.env.VITE_MAPTILER_API_KEY
      }`}
    >
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
      {hospitals.map((hospital) => {
        const isHospitalSelected =
          selectedHospital && selectedHospital.id === hospital.id;
        return (
          <Marker
            color={
              hospital.status === "past"
                ? CLOSED_MARKER_COLOR
                : OPEN_MARKER_COLOR
            }
            key={hospital.id}
            longitude={hospital.longitude}
            latitude={hospital.latitude}
            onClick={() =>
              setPopupInfo({
                hospitalInfo: hospital,
              })
            }
          >
            <div
              style={{
                position: "relative",
                transition: "transform 0.3s ease",
                transform: isHospitalSelected ? "scale(1.5)" : "scale(1)",
              }}
            >
              <LocationOnIcon
                sx={{
                  color:
                    hospital.status === "past"
                      ? CLOSED_MARKER_COLOR
                      : OPEN_MARKER_COLOR,
                  strokeWidth: isHospitalSelected ? "1px" : "0.2px",
                  stroke: "Black",
                  fontSize: "3rem",
                }}
              />
            </div>
          </Marker>
        );
      })}
      {popupInfo && (
        <Box sx={{ display: "flex" }}>
          <GFLPopup popupInfo={popupInfo} onClose={() => setPopupInfo(null)} />
        </Box>
      )}
    </Map>
  );
};
