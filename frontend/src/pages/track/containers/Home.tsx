import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useRef, useState } from "react";
import Success from "./Success";

const Home = () => {
    const trackingRef = useRef<HTMLInputElement>(null);
    const [foundParcel, setFoundParcel] = useState(false);
    const [data, setData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const trackingNumber = trackingRef.current?.value;

        fetch(`http://${process.env.REACT_APP_BE_URL}:5000/track`, {
            method: "POST",
            body: JSON.stringify({ trackingNumber }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((message) => {
                setFoundParcel(true);
                setData(message["parcel_tracking_items"]);
            })
            .catch((err) => {
                setFoundParcel(false);
            });
    };

    return (
        <>
            {data.length > 0 ? (
                <Success parcels={data} />
            ) : (
                <>
                    <h1>BPS Tracking</h1>
                    <div className="max-w-60 w-60 flex">
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>
                                    Enter your tracking number
                                </Form.Label>
                                <Form.Control
                                    ref={trackingRef}
                                    type="text"
                                    placeholder="tracking number"
                                    defaultValue="BPS65O4WYLBWWBR"
                                />
                            </Form.Group>
                            <Button
                                onClick={handleSubmit}
                                className="submitBtn"
                                variant="primary"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </Form>
                    </div>
                </>
            )}
        </>
    );
};

export default Home;
