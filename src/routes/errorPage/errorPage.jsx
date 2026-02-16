import { useRouteError } from "react-router-dom";
import "./errorPage.css";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="error-container">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message || "404 Page Not Found"}</i>
      </p>
    </div>
  );
}
