import { FunctionComponent } from "react";
import MyAlert from "../components/Alert";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface SignUpSuccessProps {}

const SignUpSuccess: FunctionComponent<SignUpSuccessProps> = () => {
  return (
    <MyAlert
      variant="filled"
      severity="success"
      showCloseIcon={false}
      sx={{
        backgroundColor: "#62ee62",
      }}
    >
      <Typography variant="h6">
        We have sent you an email, Please press the link inside it to validate
        your account, then click{" "}
        <Link
          to="/signin"
          style={{
            textDecoration: "none",
            color: "#2193ed",
          }}
        >
          here
        </Link>{" "}
        to login
      </Typography>
    </MyAlert>
  );
};

export default SignUpSuccess;
