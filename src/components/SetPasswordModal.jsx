import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { passwordRegex } from "../helpers/regex";

const styles = {
  errorMessages: {
    color: "#B80A26",
  },
  signInForm: {
    flexDirection: "column",
    display: "flex",
  },
  formContainer: {
    marginTop: "5%",
    width: "65%",
    margin: "0% 17%",
    fontFamily: "Montserrat",
    fontSize: "14px",
  },
  DialogHeader: {
    fontFamily: "OpenSans",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "28px",
    lineHeight: "123.5%",
    color: "#B80A26",
    margin: "0% 17%",
    marginBottom: "16px",
    paddingLeft: 0,
  },
  submitButton: {
    borderRadius: "3px",
    fontFamily: "Montserrat",
    fontStyle: "normal",
    margin: "7% 0%",
    backgroundColor: "#B80A26",
    fontWeight: 700,
    fontSize: "14px",
    letterSpacing: "1px",
    textTransform: "unset !important",
  },
};

const SetPasswordModal = (props) => {
  const { open, handleClose } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const titleMessage = "Set Your Password";

  const onSubmit = async ({ password }, { setSubmitting }) => {
    try {
      localStorage.setItem("password", password);
      localStorage.setItem("initialize", true);
      setSubmitting(false);
      await handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .matches(
        passwordRegex,
        "Must contain 8 characters, 1 Capital, 1 lowercase, 1 #, 1 Special character"
      ),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"sm"} scroll="body">
      <DialogTitle sx={styles.DialogHeader}>{titleMessage} </DialogTitle>
      <Box sx={styles.formContainer}>
        <Stack spacing={2}>
          <Formik
            initialValues={{ password: "" }}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, isSubmitting, isValid, values, handleChange }) => (
              <>
                <Form style={styles.signInForm}>
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
                  </FormControl>
                  <FormControl sx={{ mt: 3 }} variant="outlined">
                    <InputLabel htmlFor="confirm-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      name="confirmPassword"
                      id="confirm-password"
                      type={showConfirmPassword ? "text" : "password"}
                      onChange={handleChange("confirmPassword")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirmPassword visibility"
                            onClick={handleClickShowConfirmPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                    {errors.confirmPassword && (
                      <FormHelperText
                        sx={styles.errorMessages}
                        id="filled-weight-helper-text"
                      >
                        {errors.confirmPassword}
                      </FormHelperText>
                    )}
                  </FormControl>
                  <Box sx={{ display: "flex", justifyContent: "start", mt: 2 }}>
                    <Button
                      variant="contained"
                      sx={styles.submitButton}
                      type="submit"
                      disabled={
                        isSubmitting ||
                        !isValid ||
                        !values.password ||
                        !values.confirmPassword
                      }
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              </>
            )}
          </Formik>
        </Stack>
      </Box>
    </Dialog>
  );
};

export default SetPasswordModal;
