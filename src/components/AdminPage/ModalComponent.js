import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
export const ModalComponent = ({pendingRequests, modalInfo, setModalInfo}) => {
  const handleClose = () => setModalInfo({...modalInfo, openModal: false, userId: null});
  const currentInfo = pendingRequests.filter((req) => req.user === modalInfo.userId)[0];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
 const otherDetails = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    return(
    <div>
        <Modal
        open={modalInfo.openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>User Details</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>Name:</b> {currentInfo.fullName} <br/>
              <b>Pan Card:</b> {currentInfo.panNumber} <br/>
              <b>Aadhar Card:</b> {currentInfo.aadharNumber} <br/>
              <b>Income:</b> {currentInfo.income} <br/>
              <b>Occupation:</b> {currentInfo.occupation} <br/>
              <b>Other Details:</b> {currentInfo.about.slice(0, 250)} <br/>
          </Typography>
        </Box>
      </Modal>
    </div>)
}