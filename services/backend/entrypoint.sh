#!/bin/sh

# Vérifie si Postgres est bien démarré
# Quand il est démarré, lance la création de la bdd

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z "$SQL_HOST" "$SQL_PORT"; do
      sleep 0.1
    done

    echo "PostgresSQL started"
fi

# Serveur de dev = on refait la BDD
if [ "$FLASK_ENV" = "development" ]
then
    echo "Creating the database tables..."
    python manage.py create_db
    echo "Tables created"
fi

exec "$@"
