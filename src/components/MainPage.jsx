import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectExtension } from "../redux/extension/extensionSlice";
import SecreteKeyModal from "./SecreteKeyModal";
import SetPasswordModal from "./SetPasswordModal";

const MainPage = () => {
  const extensionInfo = useSelector(selectExtension);
  const [openSecreteKeyModal, setOpenSecreteKeyModal] = useState(false);
  const [openSetPasswordModal, setOpenSetPasswordModal] = useState(false);
  const [isInitialize, setIsInitialize] = useState(true);
  const navigate = useNavigate();

  const handleCloseSecreteKeyModal = () => {
    setOpenSecreteKeyModal(false);
  };

  const handleOpenSetPasswordModal = () => {
    setOpenSetPasswordModal(true);
  };

  const handleCloseSetPasswordModal = () => {
    setOpenSetPasswordModal(false);
  };

  useEffect(() => {
    if (
      extensionInfo.isInitialized &&
      extensionInfo.secreteKey &&
      extensionInfo.password &&
      !(window.location.pathname === "/login")
    ) {
      navigate("/login");
    } else {
      if (!(window.location.pathname === "/login")) {
        setOpenSecreteKeyModal(true);
        setIsInitialize(false);
      }
    }
  }, [extensionInfo, navigate]);

  return (
    <>
      {!isInitialize ? (
        <>
          <SecreteKeyModal
            open={openSecreteKeyModal}
            handleClose={handleCloseSecreteKeyModal}
            type={"new"}
            openSetPassword={handleOpenSetPasswordModal}
          />
          <SetPasswordModal
            open={openSetPasswordModal}
            handleClose={handleCloseSetPasswordModal}
          />
        </>
      ) : null}
    </>
  );
};

export default MainPage;
