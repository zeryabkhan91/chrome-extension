import { Button } from "@mui/material";
import { enviroment } from "../enviroment";

const styles = {
  submitButton: {
    borderRadius: "3px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    backgroundColor: "#B80A26",
    fontWeight: 700,
    fontSize: "14px",
    letterSpacing: "1px",
    margin: "24% 20%",
    textTransform: "unset !important",
  },
};

const Redirect = () => {
  const handleOpenExtension = () => {
    window.open(`${enviroment.APP_URL}`, "_blank");
  };

  return (
    <>
      {!(window.location.pathname === "/") &&
      !(window.location.pathname === "/login") &&
      !(window.location.pathname === "/home") ? (
        <Button
          type="submit"
          variant="contained"
          sx={styles.submitButton}
          onClick={handleOpenExtension}
        >
          Get Started
        </Button>
      ) : null}
    </>
  );
};

export default Redirect;
