**Bridger Challenge**
===========================
> Fun coding challenge for Bridger. 
REST API built with Flask Framework and JWT.

<details open="open">
  <summary>Table of Contents</summary>
  <ul>
    <li>
        <a href="#getting-started"> Getting Started</a>
        <ul>
            <li>
                <a href="#config"> Config </a>
            </li>
            <li>
                <a href="#routes"> Routes </a>
            </li>
            <li>
                <a href="#payload">  Payload </a>
            </li>
        </ul>
    </li>
  </ul>
</details>

<span id="getting-started">**Getting Started**</span>
----------------------------

### Docker

This project uses docker-compose to build a Flask container.
```docker
docker-compose up -d
```
Running the above command launches a "bringer_backend" container. The image exposes port 5000 of the container. 

### Local
Create python environment
```
python3 -m venv env
```

Activate environment
```
. env/bin/activate
```

Install requirements
```
pip install -r requirements.txt
```

Save dotenv file
```
cp .env.example .env
```

Start application
```
python ./app.py
```

<span id="config">**Config**</span>
--------
<hr>

## Environement Variables

Can be changed within the .env and config.py file. 

```
CONFIG=['dev'|'prod']
FLASK_APP='app_name'
HOST='ip-address'
JWT_SECRET_KEY='secret'
SQLALCHEMY_DATABASE_URI='URI'
SALT='random-salt'
```

<span id="routes">**Routes**</span>
--------
<hr>

## URL

```JWT```

|  endpoints            | methods     | description                          |
|-----------------------|-------------|--------------------------------------|
| /jwt                  |  GET        | shows all users created              |
| /jwt/create-user      |  GET, POST  | creates a user                       |
| /jwt/delete-user      |  DELETE     | deletes a user                       |
| /jwt/login            |  GET, POST  | logins in user using JWT token       |
| /jwt/search-user      |  GET, POST  | searches for a user from a JWT token |
| /jwt/update-password  |  PUT        | changes a users password             |
| /jwt/user             |  GET        | shows the current users token        |

```track```

|  endpoints            | methods     | description               |
|-----------------------|-------------|---------------------------|
| /track                |  GET, POST  | shows tracking information|

**Note**: /jwt/delete-user and update-user endpoints don't have a view. All
requests support form data. /jwt/user can only be accessed if the user is logged in.

<span id="payload">**Payload**</span>
--------
<hr>

## Form
```
username: john
password: doe
```
**Note**: This is the default username and password. The server is automatically started on port 9030. 

> Once the container has **completely started**, perform requests to the any endpoint.