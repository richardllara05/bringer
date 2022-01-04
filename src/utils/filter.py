from datetime import datetime


def pkg_date(info):
    date: str
    time: str

    date, time = info["timestamp"].split("T")
    time = time.replace("Z", "")

    d = datetime.strptime(f"{date} {time}", "%Y-%m-%d %H:%M:%S.%f")
    return d.strftime("%b %d, %Y [%I:%M %p]")


def pkg_location(info):
    if info["state"] is None:
        location = f'{info["country"]["name"]}'
    elif info["city"] is None:
        location = f'{info["state"]}, {info["country"]["name"]}'
    else:
        location = f'{info["state"]}, {info["city"]}, {info["country"]["name"]}'
    return location


def pkg_status(info):
    status = info["tracking_code_vendor"]["tracking_code_vendor_locales"][0][
        "description"
    ]
    return status
