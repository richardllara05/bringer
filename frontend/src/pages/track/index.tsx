import { Routes, Route } from "react-router-dom";
import Home from "./containers/Home";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            TrackRouter: React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            >;
        }
    }
}

const TrackRouter = () => {
    return (
        <Routes>
            <Route index element={<Home />} />
        </Routes>
    );
};

export default TrackRouter;
