import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { SITE_NAME, SITE_TAGLINE, SITE_AREA_DESCRIPTION } from "../config";

export default function Home() {
  return (
    <>
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

      <section className="bg-light border-top py-5">
        <Container className="col-lg-7 mx-auto text-center">
          <h2 className="h4 mb-3">About This Site</h2>
          <p className="text-muted">
            I built this site myself to give growers around Winchester a
            simple, honest way to connect with their neighbors. As a
            Christian, I subscribe to the Apostles' Creed:
          </p>
          <blockquote className="fst-italic border-start border-success border-3 ps-3 text-start mx-auto mt-4">
            I believe in God, the Father almighty, creator of heaven and
            earth. I believe in Jesus Christ, his only Son, our Lord, who was
            conceived by the Holy Spirit, born of the Virgin Mary, suffered
            under Pontius Pilate, was crucified, died, and was buried; he
            descended into hell. On the third day he rose again from the
            dead; he ascended into heaven, and is seated at the right hand of
            God the Father almighty; from there he will come to judge the
            living and the dead. I believe in the Holy Spirit, the Holy
            Catholic Church, the communion of saints, the forgiveness of
            sins, the resurrection of the body, and life everlasting. Amen.
          </blockquote>
        </Container>
      </section>
    </>
  );
}
