import { useCookies } from "react-cookie";
import { useJwt } from "react-jwt";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [cookies] = useCookies(["token"]);
    const { decodedToken, isExpired } = useJwt(cookies.token);

    useEffect(() => {
        if (decodedToken && !isExpired) {
            navigate("/jwt/user");
        }
    }, [decodedToken, isExpired, navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();

        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (username && password) {
            await fetch(`http://${process.env.REACT_APP_BE_URL}:5000/jwt/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ username, password }),
            })
                .then((res) => res.json())
                .then((message) => {
                    if (message["status"] === "success") {
                        console.log(message);
                        navigate("/jwt/user");
                    }
                })
                .catch((err) => {
                    console.log("Error making request to /jwt/login:", err);
                });
        }
    };

    return (
        <>
            {
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter username"
                            ref={usernameRef}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={passwordRef}
                        />
                    </Form.Group>
                    <Button type="submit" onClick={handleLogin}>
                        Login
                    </Button>
                </Form>
            }
        </>
    );
};

export default Login;
