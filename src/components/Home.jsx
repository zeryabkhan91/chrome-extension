import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SecreteKeyModal from "./SecreteKeyModal";

const styles = {
  homePage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B80A26",
    width: "100vw",
    height: "100vh",
  },
  infoPage: {
    backgroundColor: "white",
    padding: "4% 6%",
    borderRadius: "10px",
    border: "3px solid red",
  },
  signInTypo: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "123.5%",
    color: "#B80A26",
    marginBottom: "15px",
  },
  submitButton: {
    borderRadius: "3px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    backgroundColor: "#B80A26",
    fontWeight: 700,
    fontSize: "14px",
    letterSpacing: "1px",
    textTransform: "unset !important",
  },
  typography: {
    fontFamily: "OpenSans",
    fontWeight: 600,
    fontSize: "20px",
    cursor: "pointer",
    marginTop: "20%",
  },
  key: {
    fontFamily: "OpenSans",
    fontWeight: 400,
    fontSize: "20px",
    marginLeft: "9%",
  },
  description: {
    fontFamily: "OpenSans",
    fontWeight: 200,
    fontSize: "15px",
    marginBottom: "10%",
  },
  messege: {
    fontFamily: "OpenSans",
    fontWeight: 200,
    fontSize: "15px",
    color: "#B80A26",
  },
};

const Home = () => {
  const [openSecreteKeyModal, setOpenSecreteKeyModal] = useState(false);
  const [messege, setMessege] = useState(false);
  const navigate = useNavigate();

  const handleCloseSecreteKeyModal = () => {
    setOpenSecreteKeyModal(false);
    setMessege(true);
    setTimeout(() => {
      setMessege(false);
    }, 3000);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleUpdate = () => {
    setOpenSecreteKeyModal(true);
  };

  return (
    <Box sx={styles.homePage}>
      <Box sx={styles.infoPage}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={styles.signInTypo}>{"Home Page"}</Typography>
          <Button
            type="submit"
            variant="contained"
            onClick={handleLogout}
            sx={styles.submitButton}
          >
            Log out
          </Button>
        </Box>
        {messege ? (
          <p style={styles.messege}>Secret Key has been updated!.</p>
        ) : null}
        <p style={styles.typography}>
          Secrete Key:{" "}
          <span style={styles.key}>{atob(localStorage["secreteKey"])}</span>
        </p>
        <p style={styles.description}>
          Note: Here is your secrete key keep it secure.
        </p>
        <Button
          type="submit"
          variant="contained"
          sx={styles.submitButton}
          onClick={handleUpdate}
        >
          Update Key
        </Button>
      </Box>
      <SecreteKeyModal
        open={openSecreteKeyModal}
        handleClose={handleCloseSecreteKeyModal}
        type={"update"}
      />
    </Box>
  );
};

export default Home;
