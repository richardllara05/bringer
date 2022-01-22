import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Register = () => {
    const usernameRef = useRef<HTMLInputElement>();
    const passwordRef = useRef<HTMLInputElement>();
    const navigate = useNavigate();
    const [cookies] = useCookies(["token"]);
    const [hasRegistered, setRegister] = useState(false);
    const { decodedToken, isExpired } = useJwt(cookies.token);

    useEffect(() => {
        if (decodedToken && !isExpired) {
            navigate("/jwt/user");
        }
    }, [decodedToken, isExpired, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (username && password) {
            const PORT = process.env.REACT_APP_BE_PORT;

            await fetch(`http://localhost:${PORT}/jwt/create-user`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            })
                .then((res) => res.json())
                .then((message) => {
                    setRegister(true);
                })
                .catch((err) => console.log("Error", err));
        }

        if (hasRegistered) {
            await setTimeout(() => navigate("/jwt"), 3000);
        }
    };

    return (
        <>
            {hasRegistered ? (
                <Alert>User registerd!!</Alert>
            ) : (
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            ref={usernameRef}
                            type="text"
                            placeholder="Username"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            ref={passwordRef}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Register
                    </Button>
                </Form>
            )}
        </>
    );
};

export default Register;
