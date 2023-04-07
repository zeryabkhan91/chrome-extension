import { Button, Dialog, DialogTitle } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSecreteKey } from "../redux/extension/extensionSlice";

const styles = {
  DialogHeader: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "123.5%",
    color: "#B80A26",
    margin: "0% 14%",
    marginBottom: "14px",
    paddingLeft: 0,
  },
  typography: {
    fontFamily: "OpenSans",
    fontWeight: 600,
    fontSize: "20px",
    margin: "3% 14%",
    cursor: "pointer",
  },
  key: {
    fontFamily: "OpenSans",
    fontWeight: 400,
    fontSize: "20px",
    marginLeft: "10%",
  },
  description: {
    fontFamily: "OpenSans",
    fontWeight: 200,
    fontSize: "15px",
    margin: "0% 14%",
  },
  messege: {
    fontFamily: "OpenSans",
    fontWeight: 200,
    fontSize: "15px",
    color: "#B80A26",
    margin: "1% 14%",
  },
  submitButton: {
    borderRadius: "3px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    margin: "7% 14%",
    backgroundColor: "#B80A26",
    fontWeight: 500,
    fontSize: "14px",
    letterSpacing: "1px",
    textTransform: "unset !important",
  },
};

const SecreteKeyModal = (props) => {
  const dataDispatcher = useDispatch();
  const { open, handleClose, type, openSetPassword } = props;
  const [secrete, setSecrete] = useState("");
  const [messege, setMessege] = useState(false);

  const titleMessage = "User Secrete key";
  const isNewProcess = type === "new" ? true : false;

  const generateSecreteKey = () => {
    const key = Math.random().toString(36).substring(2, 34);
    setSecrete(key);
  };

  const handleMessege = async () => {
    setMessege(true);
    setTimeout(() => {
      setMessege(false);
    }, 3000);
  };

  const alternateCopyToClipboard = (secreteKey) => {
    const textArea = document.createElement("textarea");
    textArea.value = secreteKey;
    document.body.appendChild(textArea);
    textArea.focus({ preventScroll: true });
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  const handleCopyToClipboard = () => {
    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(secrete);
      } else {
        alternateCopyToClipboard(secrete);
      }
      handleMessege();
    } catch (err) {
      console.log("Unable to copy to clipboard", err);
    }
  };

  const handleNext = async () => {
    handleCopyToClipboard();
    const encryptedKey = btoa(secrete);
    dataDispatcher(setSecreteKey(encryptedKey));
    handleClose();
    if (isNewProcess) {
      openSetPassword();
    }
  };

  useEffect(() => {
    generateSecreteKey();
  }, []);

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"sm"} scroll="body">
      <DialogTitle sx={styles.DialogHeader}>{titleMessage} </DialogTitle>
      <p onClick={handleCopyToClipboard} style={styles.typography}>
        Secrete Key: <span style={styles.key}>{secrete}</span>
      </p>
      {messege ? (
        <p style={styles.messege}>Copied to Clipboard Successfully!</p>
      ) : null}
      <p style={styles.description}>
        Note: Secrete key will help you in login, Keep it secrete. Click on the
        secrete key to copy to clipboard or by pressing the next button it will
        automatically copy to clipboard.
      </p>
      <Button
        variant="contained"
        sx={styles.submitButton}
        type="submit"
        onClick={handleNext}
      >
        {isNewProcess ? "NEXT" : "UPDATE"}
      </Button>
    </Dialog>
  );
};

export default SecreteKeyModal;
