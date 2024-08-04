import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Avatar, Box, Button, Popper, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { PopupInfo } from "../models/popupInfo";
import { Popup } from "react-map-gl";
import { HospitalCard } from "./cards/HospitalCard";
import "./GFLPopup.style.css";
import { Anchor } from "@mui/icons-material";

interface GFLPopupProps {
  popupInfo: PopupInfo | null;
  onClose: () => void;
}

export const GFLPopup: React.FC<GFLPopupProps> = ({
  popupInfo = null,
  onClose,
}) => {

  const [images, setImages] = useState<string[]>([]);
  useEffect(() => {
    if (popupInfo) {
      setImages(popupInfo.hospitalInfo.hospitalPicture1);
    };
  }, [popupInfo])
  console.log("images", images)
  return (
    popupInfo && (
      // <Popper id={id} open={open} anchorEl={anchorEl} >
      //     <HospitalCard popupInfo={popupInfo} images={images}/>
      // </Popper>

      <Popup
        longitude={popupInfo.hospitalInfo.longitude}
        latitude={popupInfo.hospitalInfo.latitude}
        closeButton={false}
        closeOnClick={false}
        onClose={onClose}
        anchor="top"
        className= "popup-style"
        
      >
        <HospitalCard popupInfo={popupInfo} images={images}/>
      </Popup>

    )
  );
};
