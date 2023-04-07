import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  resetExtension,
  selectExtension,
} from "../redux/extension/extensionSlice";

const styles = {
  loginPage: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#B80A26",
    width: "100vw",
    height: "100vh",
  },
  formPage: {
    backgroundColor: "white",
    padding: "4% 6%",
    borderRadius: "10px",
    border: "3px solid red",
  },
  errorMessages: {
    color: "#B80A26",
  },
  signInForm: {
    flexDirection: "column",
    display: "flex",
  },
  form: {
    flexDirection: "column",
    display: "flex",
  },
  redText: {
    width: "186px",
    height: "42px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    color: "#B80A26",
  },
  navLink: {
    textDecoration: "none",
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
  signInTypo: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "123.5%",
    color: "#B80A26",
    marginBottom: "15px",
  },
  textTypography: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: 400,
    fontSze: "14px",
    color: "#000000",
  },
  backNextButtons: {
    position: "absolute",
    bottom: "0px",
    width: "100%",
  },
};

const Login = () => {
  const navigate = useNavigate();
  const dataDispatcher = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const extensionInfo = useSelector(selectExtension);
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const [messege, setMessege] = useState(false);

  const handleMessege = async () => {
    setMessege(true);
    setTimeout(() => {
      setMessege(false);
    }, 3000);
  };

  const onSubmit = async ({ password, secreteKey }, { setSubmitting }) => {
    const authorizedKey =
      atob(extensionInfo.secreteKey) === secreteKey ? true : false;

    if (!(extensionInfo.password === password) || !authorizedKey) {
      handleMessege();
      setSubmitting(false);
    } else {
      navigate("/home");
    }
  };

  const handleResetApplication = async () => {
    dataDispatcher(resetExtension());
    navigate("/");
  };

  const validationSchemaLogin = Yup.object({
    secreteKey: Yup.string().required("Secrete key is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Box sx={styles.loginPage}>
      <Box sx={styles.formPage}>
        <div style={styles.signInTypo}>{"Login"}</div>
        <Formik
          initialValues={{ secreteKey: "", password: "" }}
          onSubmit={onSubmit}
          validationSchema={validationSchemaLogin}
        >
          {({ errors, isSubmitting, isValid, values, handleChange }) => (
            <>
              <Form style={styles.signInForm}>
                <FormControl sx={{ mb: 2 }} variant="outlined">
                  <TextField
                    label="Secrete Key"
                    variant="outlined"
                    name="secreteKey"
                    id="secreteKey"
                    onChange={handleChange("secreteKey")}
                  />
                  {errors.secreteKey && (
                    <FormHelperText
                      sx={styles.errorMessages}
                      id="filled-weight-helper-text"
                    >
                      {errors.secreteKey}
                    </FormHelperText>
                  )}
                </FormControl>

                <FormControl sx={{}} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    name="password"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange("password")}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  {errors.password && (
                    <FormHelperText
                      sx={styles.errorMessages}
                      id="filled-weight-helper-text"
                    >
                      {errors.password}
                    </FormHelperText>
                  )}
                  <FormHelperText id="filled-weight-helper-text">
                    8 characters, 1 Capital, 1 lowercase, 1 #, 1 Special
                    character{" "}
                  </FormHelperText>
                </FormControl>
                {messege ? (
                  <p style={styles.errorMessages}>
                    Wrong secrete key or password
                  </p>
                ) : null}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 2,
                    marginTop: "8%",
                  }}
                >
                  <NavLink
                    style={styles.navLink}
                    to={"/"}
                    onClick={handleResetApplication}
                  >
                    <Typography sx={styles.redText}>
                      {"Reset Application?"}
                    </Typography>
                  </NavLink>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={styles.submitButton}
                  >
                    Login
                  </Button>
                </Box>
              </Form>
            </>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default Login;
