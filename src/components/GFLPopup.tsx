import { Stack, Typography, Button, Box, Avatar } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { PopupInfo } from '../models/popupInfo';

interface GFLPopupProps {
  popupInfo: PopupInfo | null;
  onClose: () => void;
}

export const GFLPopup: React.FC<GFLPopupProps> = ({
  popupInfo = null,
  onClose
}) => {
  if (!popupInfo) return null;

  const images: string[] = popupInfo.hospitalInfo.hospitalPicture1;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '30px',
        zIndex: 1000,
        p: 2,
      }}
    >
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ width: '40%', p: 1 }}>
          {images && images.length > 0 && (
            <Carousel
              showThumbs={false}
              showIndicators={false}
              showArrows={true}
              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                hasPrev && (
                  <button type="button" onClick={onClickHandler} title={label} style={arrowPrevStyles}>
                    <ArrowBackIosIcon />
                  </button>
                )
              }
              renderArrowNext={(onClickHandler, hasNext, label) =>
                hasNext && (
                  <button type="button" onClick={onClickHandler} title={label} style={arrowNextStyles}>
                    <ArrowForwardIosIcon />
                  </button>
                )
              }
            >
              {images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`${popupInfo.hospitalInfo.name} Picture`} style={{ width: '100%', height: 'auto' }} />
                </div>
              ))}
            </Carousel>
          )}
        </Box>
        <Box sx={{ width: '60%', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Stack spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOnIcon color="primary" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                {popupInfo.hospitalInfo.city}, {popupInfo.hospitalInfo.state}
              </Typography>
            </Box>
            <Typography fontWeight={600}>{popupInfo.hospitalInfo.name}</Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              "{popupInfo.hospitalInfo.description}"
            </Typography>
          </Stack>
          <Button variant="contained" color="primary" onClick={onClose}>Learn more</Button>
        </Box>
        <Box sx={{ width: '30%', p: 2, borderLeft: '1px solid #ddd', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar src="/path/to/profile1.jpg" sx={{ width: 24, height: 24, mr: 1 }} />
              <Avatar src="/path/to/profile2.jpg" sx={{ width: 24, height: 24, mr: 1 }} />
              <Avatar sx={{ width: 24, height: 24 }}>+</Avatar>
            </Box>
            <Typography variant="body2">
              Donations received: <strong>150k</strong>
            </Typography>
            <Typography variant="body2">
              400+ kids impacted
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

const arrowPrevStyles = {
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 15px)',
  left: 15,
  width: 30,
  height: 30,
  cursor: 'pointer',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
};

const arrowNextStyles = {
  position: 'absolute',
  zIndex: 2,
  top: 'calc(50% - 15px)',
  right: 15,
  width: 30,
  height: 30,
  cursor: 'pointer',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.3)',
};
