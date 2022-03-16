# Image python
FROM python:3.9.5-slim-buster

# repertoire de travail
WORKDIR /usr/src/app

# Variable d'environnement
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Dépendances système
RUN apt-get update && apt-get install -y netcat

# Dépendances du projet
RUN pip install --upgrade pip
COPY ./requirements.txt /usr/src/app/requirements.txt
RUN pip install -r requirements.txt

# Copie du projet
COPY . /usr/src/app/

# Lancement du script
ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
