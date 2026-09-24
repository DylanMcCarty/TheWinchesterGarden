import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

export default function GrowerCard({ grower }) {
  const crops = (grower.crops || "")
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title>{grower.farmName}</Card.Title>
        {grower.location && (
          <Card.Subtitle className="mb-2 text-muted">
            📍 {grower.location}
          </Card.Subtitle>
        )}

        {crops.length > 0 && (
          <div className="mb-2">
            {crops.map((crop) => (
              <Badge bg="success" className="me-1 mb-1" key={crop}>
                {crop}
              </Badge>
            ))}
          </div>
        )}

        {grower.notes && (
          <Card.Text className="flex-grow-1">{grower.notes}</Card.Text>
        )}

        {(grower.contactName || grower.email || grower.phone) && (
          <Card.Text className="mt-auto mb-0 small">
            {grower.contactName && (
              <span className="text-muted">Contact: {grower.contactName}</span>
            )}
            {grower.contactName && (grower.email || grower.phone) && <br />}
            {grower.email && <a href={`mailto:${grower.email}`}>{grower.email}</a>}
            {grower.email && grower.phone && <br />}
            {grower.phone && <a href={`tel:${grower.phone}`}>{grower.phone}</a>}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}
