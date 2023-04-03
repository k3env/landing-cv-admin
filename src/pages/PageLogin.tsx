import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Home } from "~routes";
import { retry } from "../helpers/interceptor";

export function PageLogin(props: {}) {
  useEffect(() => {
    retry(
      "GET",
      `${import.meta.env.VITE_AUTH_URL}/user/me`,
      undefined,
      () => Home.route.open(),
      () => {}
    );
  }, []);
  return (
    <div>
      <h3>Login</h3>
      <p>Via:</p>
      <Button
        variant="dark"
        as="a"
        href={`${import.meta.env.VITE_LOGIN_URL}?callback=${
          import.meta.env.VITE_PUBLIC_URL
        }`}
      >
        ID
      </Button>
    </div>
  );
}
