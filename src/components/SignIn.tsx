import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { FC } from "react";
import { AuthContext } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import MyAlert from "./Alert";

interface SignInProps {}

type FormSignData = {
  email?: string;
  password?: string;
  signInError?: string;
};

export const SignIn: FC<SignInProps> = () => {
  const [errors, setErrors] = React.useState<FormSignData>({});
  const { setAuth } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const buildErrors: FormSignData = {};
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!email) {
      buildErrors.email = "This Field is required!";
    }

    if (!password) {
      buildErrors.password = "This Field is required!";
    }

    if (Object.keys(buildErrors).length !== 0) {
      setErrors(buildErrors);
      return;
    }

    fetch(import.meta.env.VITE_API_URL_LOGIN!, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      credentials: "include",

      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        const data = res.statusCode === undefined ? res : null;
        //console.log(state, state?.path || "/home");
        setAuth(data);
        return res;
      })
      .then((res) => {
        if (res.statusCode === undefined) navigate("/home");
        else setErrors({ signInError: res.message });
      });

    //
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {errors.signInError && (
          <MyAlert
            message={errors.signInError}
            severity="error"
            variant="filled"
          />
        )}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={Boolean(errors.email)}
            helperText={errors.email || ""}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password || ""}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
