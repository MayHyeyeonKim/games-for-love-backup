/**
 *  HospitalCardDetails.tsx
 *
 *  @copyright 2024 Digital Aid Seattle
 *
 */
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { Room } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import {
  DonationHospitalContext,
  LearnMoreHospitalContext,
  SelectedHospitalContext,
} from "../context/SelectedHospitalContext";
import { GeneralInfo } from "../models/generalInfo";
import { Hospital } from "../models/hospital";
import { generalInfoService } from "../services/generalInfo/generalInfoService";
import { hospitalService } from "../services/hospital/hospitalService";
import ActionButton from "../styles/ActionButton";
import EmphasizedText from "../styles/EmphasizedText";
import {
  BORDER_COLOR,
  getStatusColor,
  HIGHLIGHT_BACKGROUD_COLOR,
  SELECTED_BACKGROUD_COLOR,
} from "../styles/theme";

export const HospitalCardDetails: React.FC<{ hospital: Hospital }> = ({
  hospital,
}) => {
  const { hospital: selectedHospital, setHospital: setSelectedHospital } =
    useContext(SelectedHospitalContext);
  const { setHospital: setDonationHospital } = useContext(
    DonationHospitalContext
  );
  const { setHospital: setLearnMoreHospital } = useContext(
    LearnMoreHospitalContext
  );

  const [backgroundColor, setBackgroundColor] = useState<string>();
  const [pinColor, setPinColor] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [generalInfo, setGeneralInfo] = useState<GeneralInfo | null>(null);

  const theme = useTheme();

  useEffect(() => {
    if (hospital) {
      setBackgroundColor(
        hospitalService.isEqual(hospital, selectedHospital)
          ? SELECTED_BACKGROUD_COLOR
          : ""
      );
      setPinColor(
        getStatusColor(
          hospitalService.isEqual(hospital, selectedHospital)
            ? "selected"
            : hospital.status === "past"
            ? "past"
            : "active"
        )
      );
      setIsOpen(hospitalService.isHospitalOpen(hospital));
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

  const handleLearnMore = (evt: any) => {
    evt.stopPropagation();
    setLearnMoreHospital(hospital);
  };

  const handleDonate = (evt: any) => {
    evt.stopPropagation();
    setDonationHospital(hospital);
  };
  useEffect(() => {
    const fetchGeneralInfo = async () => {
      const [info] = await generalInfoService.getGeneralInfo();
      setGeneralInfo(info);
    };
    fetchGeneralInfo();
  }, []);

  const partnerLogos = [
    generalInfo?.corpPartner1Logo,
    generalInfo?.corpPartner2Logo,
    generalInfo?.corpPartner3Logo,
  ].filter(Boolean);

  return (
    <div data-testid="hospital-detail-card">
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "10px 0",
          cursor: "pointer",
          backgroundColor: backgroundColor,
        }}
        onClick={changeSelectedHospital}
      >
        <CardActionArea
          sx={{
            display: "flex",
            padding: 2,
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            "&:focus": {
              outline: "none",
            },
            "&:focus-visible": {
              outline: "none",
            },
            "& .MuiCardActionArea-focusHighlight": {
              background: "transparent",
            },
          }}
        >
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
                borderRight: "1px solid " + BORDER_COLOR,
              }}
            >
              <Typography variant="subtitle2" color="text.secondary">
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
                {[hospital?.city, hospital?.state].filter((s) => s).join(", ")}
              </Typography>

              <Typography variant="h6" component="div">
                {hospital?.name}
              </Typography>
              <EmphasizedText
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "4",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {hospital?.description}
              </EmphasizedText>
              <Stack direction={"row"} gap={1} marginTop={2}>
                <ActionButton onClick={handleLearnMore}>
                  Learn more
                </ActionButton>
                <ActionButton disabled={!isOpen} onClick={handleDonate}>
                  Donate
                </ActionButton>
              </Stack>
            </CardContent>
            <CardContent
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 0.8,
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                marginTop={1}
                sx={{
                  backgroundColor: HIGHLIGHT_BACKGROUD_COLOR,
                  borderRadius: "8px",
                  padding: "2px 10px 2px 10px",
                  width: "245px",
                }}
              >
                {partnerLogos.length > 0 ? (
                  partnerLogos.map((logo, index) => (
                    <img
                      key={index}
                      src={logo}
                      alt={`Corporate Partner ${index + 1}`}
                      style={{ width: 50, height: 50, borderRadius: "50%" }}
                    />
                  ))
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: (theme) => theme.palette.common.black }}
                  >
                    Matched by Unknown Partner
                  </Typography>
                )}
              </Box>
              <Typography variant="body2" color="text.secondary">
                ${Math.round(hospital.matchedFunded?.fundingCompleted || 0)}{" "}
                raised of ${Math.round(hospital.matchedRequest?.requested || 0)}{" "}
                -{" "}
                <EmphasizedText
                  sx={{
                    color: getStatusColor(
                      hospital?.status === "past" ? "past" : "active"
                    ),
                  }}
                >
                  {hospital?.status}
                </EmphasizedText>
              </Typography>

              <Typography variant="body2" color={theme.palette.text.secondary}>
                {hospital.year}+ kids impacted
              </Typography>
              <EmphasizedText
                align="center"
                sx={{
                  marginTop: 5,
                  fontWeight: "bold",
                  color: (theme: Theme) => theme.palette.grey[500],
                }}
              >
                {hospitalService.getDonationMessage(hospital)}
              </EmphasizedText>
            </CardContent>
          </Stack>
        </CardActionArea>
      </Card>
    </div>
  );
};
