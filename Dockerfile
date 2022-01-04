FROM python:3

WORKDIR /usr/src/bringer
EXPOSE 5000

COPY . .
RUN pip install -r requirements.txt
RUN cp .env.example .env 
CMD [ "python", "./app.py" ]