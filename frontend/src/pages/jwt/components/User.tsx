import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const User = () => {
    const [user, setUser] = useState(null);

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);
    const { decodedToken, isExpired } = useJwt(cookies.token);
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        removeCookie("token", {
            path: "/",
        });
        navigate("/jwt");
    };

    useEffect(() => {
        const checkLogin = async () => {
            if (!decodedToken) {
                await fetch(`http://${process.env.REACT_APP_BE_URL}:5000/jwt/user`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "localhost:5000",
                    },
                    body: JSON.stringify({ token: cookies.token }),
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setUser(data);
                    });
            } else {
                navigate("/jwt/login");
            }
        };

        checkLogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1>User</h1>
            {!user ? (
                <div></div>
            ) : (
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Hashed Password</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.password}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Button onClick={handleLogout}>Logout</Button>
                </>
            )}
        </>
    );
};

export default User;
