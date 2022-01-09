import moment from "moment";
import Card from "react-bootstrap/Card";
import DeliveredIcon from "../components/DeliveredIcon";
import TrackingCard from "../components/TrackingCard";
import TruckIcon from "../components/TruckIcon";

interface Parcel {
    date: string;
    location: string;
    status: string;
    state: string;
}

interface Parcels {
    parcels: Array<Parcel>;
}

const Success = ({ parcels }: any) => {
    const parseDatetime = (parcel) => {
        let [date, time] = parcel["timestamp"].split("T");
        time = time.replace("Z", "");
        const d = moment(`${date} ${time}`, "%YYYY-%MM-%DD %HH:%mm:%SS.SSS%");

        return d;
    };

    const parseLocation = (parcel) => {
        let location = "";

        if (parcel["state"] === null) location = parcel["country"]["name"];
        else if (parcel["city"] === null)
            location = `${parcel["state"]}, ${parcel["country"]["name"]}`;
        else
            location = `${parcel["state"]}, ${parcel["city"]}, ${parcel["country"]["name"]}`;
        return location;
    };

    const parseStatus = (parcel: any) => {
        let status = parcel;

        if (parcel["tracking_code_vendor"]) {
            status =
                status["tracking_code_vendor"][
                    "tracking_code_vendor_locales"
                ][0]["description"];
        } else {
            status = "missing";
        }

        return status;
    };

    return (
        <>
            <h1>Tracking Info</h1>

            <Card className="text-left p-10 rounded-md">
                <Card.Body>
                    {parcels
                        .filter((parcel) => parcel.state)
                        .map(
                            (parcel, pos) =>
                                pos + 1 < parcels.length - 2 && (
                                    <TrackingCard
                                        key={pos}
                                        datetime={parseDatetime(parcel)}
                                        status={parseStatus(parcel)}
                                        location={parseLocation(parcel)}
                                        shouldRender={pos === 0 ? false : true}
                                        Icon={DeliveredIcon}
                                    />
                                )
                        )}

                    {
                        <TrackingCard
                            datetime={parseDatetime(
                                parcels[parcels.length - 2]
                            )}
                            status="Parcel information received"
                            location={parseLocation(
                                parcels[parcels.length - 2]
                            )}
                        />
                    }

                    {
                        <TrackingCard
                            datetime={parseDatetime(
                                parcels[parcels.length - 1]
                            )}
                            status="Parcel address verification processed"
                            location={parseLocation(
                                parcels[parcels.length - 1]
                            )}
                            shouldRender={false}
                            Icon={TruckIcon}
                        />
                    }
                </Card.Body>
            </Card>
        </>
    );
};

export default Success;
