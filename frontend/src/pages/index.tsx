import Nav from "react-bootstrap/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import JwtRouter from "./jwt";
import TrackRouter from "./track";

const Router = () => {
    return (
        <BrowserRouter>
            <div className="flex flex-col items-center">
                <Nav className="justify-content-center" activeKey="/">
                    <Nav.Item>
                        <Nav.Link href="/">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/track">Track</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/jwt">JWT</Nav.Link>
                    </Nav.Item>
                </Nav>
                <div className="text-center mb-5">
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="jwt/*" element={<JwtRouter />} />
                        <Route path="track/*" element={<TrackRouter />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default Router;
