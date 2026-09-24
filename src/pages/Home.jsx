import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { SITE_NAME, SITE_TAGLINE, SITE_AREA_DESCRIPTION } from "../config";

export default function Home() {
  return (
    <Container>
      <Row className="py-5 text-center">
        <Col>
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
        </Col>
      </Row>

      <Row className="py-4 g-4 text-center">
        <Col md={4}>
          <div className="p-4 h-100 border rounded-3 bg-light">
            <div className="fs-1">🌾</div>
            <h5 className="mt-2">1. Growers sign up</h5>
            <p className="text-muted mb-0">
              Local growers submit what they grow, where, and how to reach
              them.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-4 h-100 border rounded-3 bg-light">
            <div className="fs-1">✅</div>
            <h5 className="mt-2">2. Listings get a quick check</h5>
            <p className="text-muted mb-0">
              Every new listing is reviewed before it goes public, to keep
              the directory legit.
            </p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-4 h-100 border rounded-3 bg-light">
            <div className="fs-1">🤝</div>
            <h5 className="mt-2">3. Neighbors connect</h5>
            <p className="text-muted mb-0">
              Anyone can browse the directory and reach out directly to a
              grower near them.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
