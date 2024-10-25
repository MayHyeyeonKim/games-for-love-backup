/**
 *  HospitalCardDetails.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
<<<<<<< Updated upstream
  Button,
  Avatar,
=======
>>>>>>> Stashed changes
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { Room } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import { HospitalInfo } from "../models/hospitalInfo";
<<<<<<< Updated upstream
import { HospitalsContext } from "../context/HospitalsContext";
=======
import ActionButton from "../styles/ActionButton";
import { SelectedHospitalContext } from "../context/SelectedHospitalContext";
>>>>>>> Stashed changes

interface HospitalDetailsProps {
  hospital: HospitalInfo | null;
}

<<<<<<< Updated upstream
export const HospitalCardDetails: React.FC<HospitalDetailsProps> = ({ hospital }) => {
  const [images, setImages] = useState<string[]>([]);
  const { setSelectedHospital, selectedHospital} = useContext(HospitalsContext);
=======
export const HospitalCardDetails: React.FC<HospitalDetailsProps> = ({
  hospital,
}) => {
  const { selectedHospital, setSelectedHospital } = useContext(
    SelectedHospitalContext
  );
>>>>>>> Stashed changes
  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [pinColor, setPinColor] = useState<string>();

  useEffect(() => {
    if (hospital) {
<<<<<<< Updated upstream
      setImages(hospital.hospitalPicture1);
      setBackgroundColor(selectedHospital ? hospital.id === selectedHospital.id ? '#f0f5fb' : '' : '');
    }
  }, [hospital, selectedHospital]);

  const handleCardClicked = ()=> {
    if(hospital){
      if(selectedHospital && selectedHospital.id === hospital.id){
        setSelectedHospital(undefined)
      } else {
        setSelectedHospital(hospital);
      }
=======
      setBackgroundColor(
        selectedHospital
          ? hospital.id === selectedHospital.id
            ? "#F0F5FA"
            : ""
          : ""
      );
      setPinColor(
        selectedHospital
          ? hospital.id === selectedHospital.id
            ? hospital.status === "past"
              ? "#DB5757"
              : "#92C65E"
            : "#92C65E"
          : "#92C65E"
      );
    }
  }, [hospital, selectedHospital]);

  const changeSelectedHospital = () => {
    if (selectedHospital) {
      if (hospital.id === selectedHospital.id) {
        setSelectedHospital(undefined);
      } else {
        setSelectedHospital(hospital);
      }
    } else {
      setSelectedHospital(hospital);
>>>>>>> Stashed changes
    }
  };

  const handleCarousel = (evt: any) => {
    if (selectedHospital) {
      if (hospital.id === selectedHospital.id) {
        evt.stopPropagation();
      } else {
        setSelectedHospital(hospital);
      }
    } else {
      setSelectedHospital(hospital);
    }
  };

  return (
    <div
      style={{cursor: "pointer"}}
      onClick={()=>handleCardClicked()}
    >
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          margin: "10px 0",
<<<<<<< Updated upstream
          backgroundColor: backgroundColor
=======
          cursor: "pointer",
          backgroundColor: backgroundColor,
>>>>>>> Stashed changes
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: 120, height: 120, borderRadius: 2 }}
          image={images[0]}
          alt="Hospital Image"
        />
        <CardContent
          sx={{ flex: 1, padding: "0 16px", borderRight: "1px solid #d9d9d9" }}
        >
<<<<<<< Updated upstream
          <Typography variant="subtitle2" color="textSecondary">
            <Pin /> {hospital?.city}, {hospital?.state}
          </Typography>

          <Typography variant="h6" component="div">
            {hospital?.name}
          </Typography>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ fontStyle: "italic" }}
          >
            {hospital?.description}
          </Typography>

          <Typography
            variant="body2"
            color="primary"
            sx={{ marginTop: 1, color: "#2293C4" }}
          >
            LEARN MORE &gt;
          </Typography>
        </CardContent>

        <CardContent sx={{ flex: 1 }}>
          <Typography variant="body2" color="textSecondary">
            <span style={{ color: "black" }}>25k </span> raised of 100k -{" "}
            <Typography
              variant="body2"
              component="span"
              color="success.main"
              sx={{ fontStyle: "italic", color: "#92c65e" }}
            >
              {hospital?.status}
            </Typography>
          </Typography>

          <Typography variant="body2" color="textSecondary">
            400+ kids impacted
          </Typography>

          <Box display="flex" alignItems="center" marginTop={1}>
            <Typography variant="body2" color="textSecondary" marginRight={1}>
              Matched by
            </Typography>
            <Avatar
              alt="Organization Logo"
              src="/path/to/profile1.jpg"
              sx={{ width: 20, height: 20, marginLeft: 1 }}
            />
            <Avatar
              alt="Organization Logo"
              src="/path/to/profile2.jpg"
              sx={{ width: 20, height: 20, marginLeft: 1 }}
            />
            +
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: 2,
              width: "100%",
              backgroundColor: "#000",
              borderRadius: "40px",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "transparent",
                color: "#000",
              },
            }}
          >
            Donate
          </Button>

          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ marginTop: 1 }}
          >
            15 days left to donate!
          </Typography>
        </CardContent>
=======
          <Stack direction={"row"}>
            <CardContent
              sx={{
                flex: 1,
              }}
            >
              <Box onClick={handleCarousel}>
                <Carousel showStatus={false} showThumbs={false}>
                  {hospital.hospitalPictures.map((url, idx) => (
                    <CardMedia
                      key={"p" + idx}
                      component="img"
                      sx={{ width: 135, height: 150, borderRadius: 2 }}
                      image={url}
                      alt="Hospital Image"
                    />
                  ))}
                </Carousel>
              </Box>
            </CardContent>

            <CardContent
              sx={{
                flex: 2,
                padding: "0 16px",
                borderRight: "1px solid #d9d9d9",
              }}
            >
              <Typography variant="subtitle2" color="textSecondary">
                <Room
                  sx={{
                    color: pinColor,
                    strokeWidth: "0.2px",
                    stroke: "black",
                    fontSize: "1rem",
                    "& .MuiSvgIcon-root": {
                      outline: "1px solid red",
                      outlineOffset: "2px",
                    },
                  }}
                />{" "}
                {hospital?.city}, {hospital?.state}
              </Typography>

              <Typography variant="h6" component="div">
                {hospital?.name}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontStyle: "italic",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "4",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {hospital?.description}
              </Typography>

              <Stack direction={"row"} gap={1} marginTop={2}>
                <ActionButton
                  onClick={(evt: any) => {
                    evt.stopPropagation();
                    alert("learn more");
                  }}
                >
                  Learn more
                </ActionButton>
                <ActionButton
                  onClick={(evt: any) => {
                    evt.stopPropagation();
                    alert("donate");
                  }}
                >
                  Donate
                </ActionButton>
              </Stack>
            </CardContent>
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="body2" color="textSecondary">
                <span style={{ color: "black" }}>25k </span> raised of 100k -{" "}
                <Typography
                  variant="body2"
                  component="span"
                  color="success.main"
                  sx={{ fontStyle: "italic", color: "#92c65e" }}
                >
                  {hospital?.status}
                </Typography>
              </Typography>

              <Typography variant="body2" color="textSecondary">
                400+ kids impacted
              </Typography>

              <Box display="flex" alignItems="center" marginTop={1}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  marginRight={1}
                >
                  Matched by
                </Typography>
                <Avatar
                  alt="Organization Logo"
                  src="/path/to/profile1.jpg"
                  sx={{ width: 20, height: 20, marginLeft: 1 }}
                />
                <Avatar
                  alt="Organization Logo"
                  src="/path/to/profile2.jpg"
                  sx={{ width: 20, height: 20, marginLeft: 1 }}
                />
                +
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                align="center"
                sx={{ marginTop: 1 }}
              >
                15 days left to donate!
              </Typography>
            </CardContent>
          </Stack>
        </CardActionArea>
>>>>>>> Stashed changes
      </Card>
    </div>
  );
};
