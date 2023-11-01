import { Backdrop, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface Props {
  isOpen: boolean;
  position?: string;
}

const LoadingModal = ({ isOpen, position }: Props) => {
  const location = useLocation()
  return (
    location.pathname == "/" || position == "absolute" ?
      <Backdrop //border-radius: 5px 10px 5px 10px;
        open={isOpen}
        style={{ margin: "0px 0px 10px 0px", padding: "0px 0px 10px 0px", width: "100%", height: "100%", position: "absolute", borderRadius: '10px'}}
        sx={{ color: '#fff', zIndex: 0 || Number.MAX_SAFE_INTEGER }}
        
      >
        <CircularProgress color="inherit" size={65} />
      </Backdrop>
    :
      <Backdrop
        open={isOpen}
        onClick={() => null}
        style={{ margin: "0px", padding: "0px", width: "100%"}}
        sx={{ color: '#fff', zIndex: 30 || Number.MAX_SAFE_INTEGER }}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
  );
};

export default LoadingModal;

