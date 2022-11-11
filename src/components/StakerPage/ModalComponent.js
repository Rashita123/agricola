import * as React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
export const ModalComponent = ({ modalDisplay, setModalDisplay, request }) => {
    const handleClose = () => setModalDisplay(false);

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
    return (
        <div>
            <Modal
                open={modalDisplay}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <b>Loan Details</b>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <b>Principle:</b> {request.principle} <br />
                        <b>Roi:</b> {request.Roi} <br />
                        <b>Loan Amount:</b> {request.loanAmount} <br />
                        <b>Duration:</b> {request.duration} <br />
                        <b>Info:</b> {request.info.slice(0, 150)} <br />
                        <b>Type:</b> {request.typeOfLoan?.slice(0, 150)} <br />
                        <b>No of Votes:</b> {request.noOfVotes} <br />
                    </Typography>
                </Box>
            </Modal>
        </div>)
}