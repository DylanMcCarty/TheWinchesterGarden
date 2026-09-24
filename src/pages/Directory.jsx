import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import GrowerCard from "../components/GrowerCard";
import { fetchGrowers } from "../api/growers";

export default function Directory() {
  const [growers, setGrowers] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    fetchGrowers()
      .then((data) => {
        if (cancelled) return;
        setGrowers(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2>Growers Directory</h2>
          <p className="text-muted">
            Approved local growers and what they're currently growing.
          </p>
        </Col>
      </Row>

      {status === "loading" && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status" variant="success" />
        </div>
      )}

      {status === "error" && (
        <Alert variant="danger">
          Couldn't load the directory right now. {error}
        </Alert>
      )}

      {status === "ready" && growers.length === 0 && (
        <Alert variant="info">
          No approved growers yet.{" "}
          <Link to="/submit">Be the first to add your farm.</Link>
        </Alert>
      )}

      {status === "ready" && growers.length > 0 && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {growers.map((grower, i) => (
            <Col key={`${grower.farmName}-${i}`}>
              <GrowerCard grower={grower} />
            </Col>
          ))}
        </Row>
      )}

      <div className="text-center mt-5">
        <Button as={Link} to="/submit" variant="success">
          Add Your Farm to the Directory
        </Button>
      </div>
    </Container>
  );
}
