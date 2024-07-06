// src/components/DASPopup.tsx
import { Popup } from 'react-map-gl';
import { PopupInfo } from '../mapping/popupInfo';
import { Stack, Typography } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

interface DASPopupProps {
  popupInfo: PopupInfo | null;
  onClose: () => void;
}

export const DASPopup: React.FC<DASPopupProps> = ({
  popupInfo = null,
  onClose
}) => {
  if (!popupInfo) return null;
  
  const images: string[] = popupInfo.hospitalInfo.hospitalPicture1;
  console.log("images", popupInfo.hospitalInfo.hospitalPicture1);

  return (
    <Popup
      anchor="top"
      longitude={Number(popupInfo.hospitalInfo.longitude)}
      latitude={Number(popupInfo.hospitalInfo.latitude)}
      onClose={() => onClose()}
      closeOnClick={false}
    >
      <Stack>
        {images && images.length > 0 && (
          <Carousel showThumbs={false}>
            {images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`${popupInfo.hospitalInfo.name} Picture`} />
              </div>
            ))}
          </Carousel>
        )}
        
        <Typography fontWeight={600}>{popupInfo.hospitalInfo.name}</Typography>
        <Typography>{popupInfo.hospitalInfo.type}</Typography>
        <Typography>{popupInfo.hospitalInfo.description}</Typography>
        <Typography>{popupInfo.hospitalInfo.address}</Typography>
      </Stack>
    </Popup>
  );
};
