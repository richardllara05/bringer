import { Routes, Route } from "react-router-dom";
import Delete from "./components/Delete";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Update from "./components/Update";
import User from "./components/User";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            JwtRouter: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

const JwtRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="user/update" element={<Update />} />
            <Route path="user/delete" element={<Delete />} />
            <Route path="user" element={<User />} />
        </Routes>
    );
};

export default JwtRouter;
