import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Avatar,
  Button,
  Chip,
  IconButton,
} from "@mui/material";
import { PopupInfo } from "../../models/popupInfo";
import "./HospitalCard.style.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { styled } from '@mui/material/styles';

const CustomCancelIconButton = styled(IconButton)({
  // backgroundColor: 'white',
  opacity: 0.8,
  border: 'none',
  boxShadow: 'none', // Ensure there's no shadow
  // '&:hover': {
  //   backgroundColor: 'black', // Keep background white on hover
  //   opacity: 1, // Adjust hover opacity if needed
  //   boxShadow: 'none', // Ensure no shadow on hover
  // },
  '& .MuiSvgIcon-root': {
    color: 'white', // Change the color of the icon to gray
  },
  '&:focus': {
    outline: 'none', // Remove the focus outline
  }
})

interface HospitalCardProps {
  popupInfo: PopupInfo | null;
  images: string[];
}

export const HospitalCard: React.FC<HospitalCardProps> = ({
  popupInfo,
  images,
}) => {
  return (
    <Card
      sx={{
        width: "265px",
        height: "242px",
        border: "none",
        borderRadius: "10px",
        // marginTop: "10px",
        boxShadow: "0px 14px 80px rgba(34, 35, 58, 0.2)",
      }}
    >
      <Box className="media-container">
        {images.length > 0 && (
          <>
          <div className="chip-and-close-btn">
          <Chip
                icon={<LocationOnIcon />}
                label={`${popupInfo?.hospitalInfo.city},${popupInfo?.hospitalInfo.state}`}
                sx={{
                  "& .MuiChip-icon": {
                    color: "#92C65E",
                  },
                }}
                className="chip"
                size="small"
              />
          </div>
          <div className="chip-and-close-btn2">
            <CustomCancelIconButton aria-label="close" className="close-btn">
              <CancelRoundedIcon />
            </CustomCancelIconButton>
            </div>
            <CardMedia
              component="img"
              height="90"
              image={images[0]}
              alt={popupInfo?.hospitalInfo.name}
              className="card-media"
            />
          </>
        )}
      </Box>
      <CardContent>
        <Typography gutterBottom component="div" sx={{ fontSize: "14px" }}>
          {popupInfo?.hospitalInfo.name}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: "10px" }}>
          <span style={{ color: "black" }}>25K </span>
          raised of 100k -{" "}
          <span style={{ color: "#92c65e", fontStyle: "italic" }}>
            {popupInfo?.hospitalInfo.status}
          </span>
        </Typography>
        <Typography sx={{ fontSize: "10px" }}>
          {popupInfo?.hospitalInfo.year}+ kids impacted
        </Typography>
        <Typography sx={{ fontSize: "10px" }}>
          <Box component="span" display="flex" alignItems="center">
            Matched by
            <Avatar
              alt="organization"
              src="/path/to/profile1.jpg"
              sx={{ width: 20, height: 20, marginLeft: 1 }}
            />
            <Avatar
              alt="organization"
              src="/path/to/profile2.jpg"
              sx={{ width: 20, height: 20, marginLeft: 1 }}
            />
            +
          </Box>
        </Typography>
       <Box sx={{display:"flex", flexDirection: "row", justifyContent:"space-between", width:'100%'}}>
       <Button
          variant="contained"
          href="#"
          sx={{
            backgroundColor: "black",
            marginTop: "8px",
            width: "112px",
            height: "26px",
            borderRadius: "10px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#000",
              
            },
          }}
        >
          Learn more
        </Button>
        <Button
          variant="contained"
          href="#"
          sx={{
            backgroundColor: "black",
            marginTop: "8px",
            width: "112px",
            height: "26px",
            borderRadius: "10px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#000",
            },
          }}
        >
          Donate
        </Button>
       </Box>
       <Box sx={{marginBottom:"5px"}}>
        <Typography textAlign={"center"} sx={{marginTop: "2px", fontSize:"10px", color:"grey", fontWeight:"bold"}}>
          15 days left to donate!
        </Typography>
      </Box>
      </CardContent>
    </Card>
  );
};
