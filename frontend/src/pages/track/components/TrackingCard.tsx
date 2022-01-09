import Card from "react-bootstrap/Card";
import Circle from "./Circle";
import DeliveredIcon from "./DeliveredIcon";

const TrackingCard = ({
    datetime,
    status,
    location,
    shouldRender = true,
    Icon = null,
}) => {
    const toDate = (datetime) => {
        return datetime.format("MMM D, YYYY");
    };

    const toTime = (datetime) => {
        return datetime.format("h:mm A");
    };

    return (
        <>
            {
                <>
                    <Card.Text className="flex flex-row">
                        <div className="font-bold w-25">{toDate(datetime)}</div>
                        <div className="mx-2">
                            {shouldRender ? <Circle /> : <Icon />}
                        </div>
                        <div>{status}</div>
                    </Card.Text>
                    <Card.Text className="flex flex-row">
                        <div className="mr-4">
                            <span style={{ color: "#95a5a6" }}>
                                {toTime(datetime)}
                            </span>
                        </div>
                        <div>{location}</div>
                    </Card.Text>
                </>
            }
        </>
    );
};

export default TrackingCard;
