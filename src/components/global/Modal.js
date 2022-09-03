import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

export const BasicModal = (props) => {
  return (
    <div>
      <Modal
        open={props.display}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          className="w-2/5 bg-indigo-50 p-5 border-2 border-black outline-none"
        >
          <div id="modal-modal-title" className="font-bold text-2xl p-2">
            {props.title}
          </div>
          <div className="text-base px-4 my-4 normal-case">
            {props.description}
          </div>
          {props.link && (
            <Link to={props.link} className="ml-2 cursor-pointer">
              <div className="inline-flex items-center px-6 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 uppercase">
                click here
              </div>
            </Link>
          )}
        </Box>
      </Modal>
    </div>
  );
};
