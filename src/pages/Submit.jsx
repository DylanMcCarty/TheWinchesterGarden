import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { submitGrower } from "../api/growers";

const initialForm = {
  farmName: "",
  contactName: "",
  email: "",
  phone: "",
  showPhone: false,
  location: "",
  crops: "",
  notes: "",
};

export default function Submit() {
  const [form, setForm] = useState(initialForm);
  const [validated, setValidated] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form2 = e.currentTarget;

    if (form2.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setStatus("submitting");
    setError("");

    try {
      await submitGrower(form);
      setStatus("success");
      setForm(initialForm);
      setValidated(false);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg={8} className="mx-auto">
          <h2>Add Your Farm</h2>
          <p className="text-muted">
            Fill this out to be listed in the directory. Submissions are
            reviewed before they go public, so don't worry if it doesn't
            show up immediately.
          </p>

          {status === "success" && (
            <Alert
              variant="success"
              onClose={() => setStatus("idle")}
              dismissible
            >
              Thanks! Your submission was received and is pending review.
            </Alert>
          )}

          {status === "error" && (
            <Alert variant="danger">
              Something went wrong submitting your info: {error}
            </Alert>
          )}

          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="farmName">
                  <Form.Label>Farm / Grower Name *</Form.Label>
                  <Form.Control
                    required
                    name="farmName"
                    value={form.farmName}
                    onChange={handleChange}
                    placeholder="e.g. Hilltop Family Farm"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a farm or grower name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="contactName">
                  <Form.Label>Your Name *</Form.Label>
                  <Form.Control
                    required
                    name="contactName"
                    value={form.contactName}
                    onChange={handleChange}
                    placeholder="e.g. Jamie Smith"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="email">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  <Form.Text muted>
                    This will be shown publicly so people can reach you.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="phone">
                  <Form.Label>Phone (optional)</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="(555) 555-5555"
                  />
                  <Form.Text muted>
                    Not shown publicly unless you check the box below.
                  </Form.Text>
                  <Form.Check
                    type="checkbox"
                    id="showPhone"
                    name="showPhone"
                    label="Also show my phone number publicly"
                    checked={form.showPhone}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="location">
                  <Form.Label>Location *</Form.Label>
                  <Form.Control
                    required
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Winchester, KY"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a general location.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group controlId="crops">
                  <Form.Label>What Do You Grow? *</Form.Label>
                  <Form.Control
                    required
                    name="crops"
                    value={form.crops}
                    onChange={handleChange}
                    placeholder="e.g. Tomatoes, eggs, honey"
                  />
                  <Form.Text muted>Separate items with commas.</Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please list at least one thing you grow or produce.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group controlId="notes">
                  <Form.Label>Anything else? (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Selling seasonally, pickup only, farm stand hours, etc."
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4">
              <Button
                type="submit"
                variant="success"
                disabled={status === "submitting"}
              >
                {status === "submitting" ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
