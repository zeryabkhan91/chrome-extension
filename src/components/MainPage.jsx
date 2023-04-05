import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SecreteKeyModal from "./SecreteKeyModal";
import SetPasswordModal from "./SetPasswordModal";

const MainPage = () => {
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
      localStorage &&
      localStorage.getItem("initialize") &&
      localStorage.getItem("password") &&
      localStorage.getItem("secreteKey") &&
      !(window.location.pathname === "/login")
    ) {
      navigate("/login");
    } else {
      if (!(window.location.pathname === "/login")) {
        setOpenSecreteKeyModal(true);
        setIsInitialize(false);
      }
    }
  }, [handleCloseSetPasswordModal]);

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
