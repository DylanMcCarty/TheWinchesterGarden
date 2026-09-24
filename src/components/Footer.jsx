import { SITE_NAME } from "../config";

export default function Footer() {
  return (
    <footer className="border-top mt-5 py-4 text-center text-muted small">
      <div className="container">
        {SITE_NAME} &middot; built to help neighbors find local growers
        &middot; {new Date().getFullYear()}
      </div>
    </footer>
  );
}
