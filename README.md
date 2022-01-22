**Bridger Challenge**
===========================
> Fun coding challenge for Bridger. 
REST API built with Express and React Framework with JWT.

<details open="open">
  <summary>Table of Contents</summary>
  <ul>
    <li>
        <a href="#getting-started"> Getting Started</a>
    </li>
    <li>
        <a href="#default">  Default Users </a>
    </li>
    <li>
        <a href="#progress">  In Progress </a>
    </li>
  </ul>
</details>

<span id="getting-started">**Getting Started**</span>
----------------------------

### Docker

This project uses docker-compose to build a React and Express container.
```docker
docker-compose up -d
```
Running the above command launches a "bringer_fe" and "bringer_be" container. The image exposes port 5000 of the container. 

### Local
> The commands should be run in ./bringer 

Install backend and frontend modules
```
npm i
```

Start backend and frontend
```
npm start
```

<span id="default">**Default Users**</span>
--------
<hr>

```
{ john, password1 }
{ ana , password2 }
{ rosa, password3 }
```
**Note**: This is the default usernames and passwords. 

**For docker:**
backend -> 9030  <br>
frontend -> 9040

**For local:**
backend -> 3000  <br> 
frontend -> 5000

> Once the container has **completely started**, perform requests to the any endpoint.

<span id="progress">**In Progress**</span>
--------
<hr>

* Nginx
* Integration tests
* Unit tests
