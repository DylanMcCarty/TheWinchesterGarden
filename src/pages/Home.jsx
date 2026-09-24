import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { SITE_NAME, SITE_TAGLINE, SITE_AREA_DESCRIPTION } from "../config";

export default function Home() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center flex-grow-1 text-center py-4">
      <h1 className="display-5 fw-bold">{SITE_NAME}</h1>
      <p className="lead text-muted col-lg-8 mx-auto">{SITE_TAGLINE}</p>
      <p className="col-lg-7 mx-auto">{SITE_AREA_DESCRIPTION}</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Button as={Link} to="/directory" variant="success" size="lg">
          Browse Growers
        </Button>
        <Button as={Link} to="/submit" variant="outline-success" size="lg">
          Add Your Farm
        </Button>
      </div>
    </Container>
  );
}
