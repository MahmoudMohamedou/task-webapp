import { FunctionComponent } from "react";
import "./ErrorPage.css";
import { Button } from "@mui/material";
import { Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
interface ErrorPageProps {}

const ErrorPage: FunctionComponent<ErrorPageProps> = () => {
  const navigate = useNavigate();
  return (
    <div className="page-404">
      <div className="outer">
        <div className="middle">
          <div className="inner">
            <div className="inner-circle">
              <i>
                <Home
                  sx={{
                    width: 100,
                    height: 100,
                  }}
                />
              </i>
              <span>404</span>
            </div>
            <span className="inner-status">Oops! You're lost</span>
            <span className="inner-detail">
              We can not find the page you're looking for.
              <Button
                startIcon={<Home />}
                variant="outlined"
                sx={{
                  color: "#39bbdb",
                  marginTop: 1,
                }}
                onClick={() =>
                  navigate({
                    pathname: "/home",
                  })
                }
              >
                Return home
              </Button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
