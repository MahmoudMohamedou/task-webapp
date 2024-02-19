import React, { FC } from "react";
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
import { useNavigate } from "react-router-dom";
import MyAlert from "../components/Alert";

interface SignUpProps {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  signUpError?: any;
}

const SignUp: FC = () => {
  const [errors, setErrors] = React.useState<Partial<SignUpProps>>({});
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const buildErrors: Partial<SignUpProps> = {};
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const repeatPassword = data.get("repeatPassword");

    if (!email) {
      buildErrors.email = "This Field is required!";
    }

    if (!password) {
      buildErrors.password = "This Field is required!";
    }
    if (!name) {
      buildErrors.name = "This Field is required!";
    }
    if (!repeatPassword) {
      buildErrors.repeatPassword = "This Field is required!";
    } else if (repeatPassword !== password) {
      buildErrors.repeatPassword = "The two paswords doesn't match!";
    }

    if (Object.keys(buildErrors).length !== 0) {
      setErrors(buildErrors);
      return;
    }
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    fetch(import.meta.env.VITE_API_URL_SIGNUP!, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password, name, repeatPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.statusCode === undefined) {
          navigate("/auth/verify/account");
        }
      });
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
        {errors.signUpError && (
          <MyAlert
            severity="error"
            variant="filled"
            message={errors.signUpError}
          />
        )}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                error={Boolean(errors.name)}
                helperText={errors.name || ""}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={errors.email || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                error={Boolean(errors.password)}
                helperText={errors.password || ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="repeatPassword"
                label="Confirm password"
                type="password"
                id="repeatPassword"
                autoComplete="new-password"
                error={Boolean(errors.repeatPassword)}
                helperText={errors.repeatPassword || ""}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
