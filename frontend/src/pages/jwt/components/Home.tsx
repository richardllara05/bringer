import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

interface User {
    username: string;
    password: string;
}

type Users = Array<User>;

const Home = () => {
    const [users, setUsers] = useState<Users>([]);
    useEffect(() => {
        const getUsers = async () => {
            const PORT = process.env.REACT_APP_BE_PORT

            await fetch(`http://localhost:${PORT}/jwt`)
                .then((res) => res.json())
                .then((data) => setUsers(data));
        };

        getUsers();
    }, []);

    return (
        <>
            <h1>Users</h1>
            <div className="flex-wrap flex flex-row">
                <Table striped bordered hover className="mx-10">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Hashed Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.username}</td>
                                    <td>{user.password}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
            <Dropdown>
                <Dropdown.Toggle>Select an Option</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/jwt/register">
                        Signup new user
                    </Dropdown.Item>
                    <Dropdown.Item href="/jwt/login">
                        Login to account
                    </Dropdown.Item>
                    <Dropdown.Item href="/jwt/user/delete">
                        Delete user
                    </Dropdown.Item>
                    <Dropdown.Item href="/jwt/user/update">
                        Update user
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};

export default Home;
