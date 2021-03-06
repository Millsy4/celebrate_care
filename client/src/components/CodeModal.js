import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import API from "../utils/API";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    marginRight: theme.spacing(1),
    justify: "center",
    alignItems: "center",
    background: "#3D6D6F",
    color: "white",
  },
}));

export default function CodeModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getCode() {
    var randomcode = Math.floor(100000 + Math.random() * 900000);
    // console.log(randomcode);
    setCode(randomcode);
    API.getFamilyCodes().then((res) => {
      const codes = res.data;
      console.log(codes);
      for (let i = 0; i < codes.length; i++) {
        if (codes[i].FamilyCode == randomcode) {
          getCode();
          console.log(codes[i].FamilyCode);
        } else {
          console.log("Code is fine!");
        }
      }
    });
  }

  return (
    <div>
      <Button
        className={classes.button}
        size="large"
        variant="contained"
        type="button"
        onClick={() => {
          getCode();
          handleOpen();
        }}
      >
        Create a Family Code Now
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Family Code</h2>
            <p id="transition-modal-description">
              Copy this code and share it with your family members
            </p>
            <h2 id="code">{code}</h2>
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(code);
              }}
            >
              Copy your code
            </Button>
            <Button
              className={classes.button}
              size="small"
              variant="contained"
              type="button"
              onClick={handleClose}
            >
              Next
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
