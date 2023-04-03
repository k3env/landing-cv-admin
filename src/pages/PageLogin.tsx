import { Button } from "react-bootstrap";

export function PageLogin(props: {}) {
  console.log(import.meta.env);
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
