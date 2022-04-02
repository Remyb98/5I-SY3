# Projet de virtualisation

## Contexte

Création d'une application avec Docker.

L'application est un CRUD d'une table User dans une base de données PostgreSQL.

## Lancement en mode developpment

Configurer les variables d'environnements :

* Copier le fichier `.env.dist` et le renommer `.env.dev`

* Modifier les valeurs avec les vôtres.

Lancer les conteneurs :
```bash
docker-compose -f docker-compose.yml up --build
```

## Lancement en mode production

Configurer les variables d'environnements :

* Copier le fichier `.env.dist` et le renommer `.env.prod`

* Modifier les valeurs avec les vôtres.

Lancer les conteneurs :
```bash
docker-compose -f docker-compose.prod.yml up --build
```

Si c'est le premier lancement de la commande, créer la base de données :
```bash
docker exec <id> python3 manage.py create_db
```

Si besoin, il existe également une commande `seed_db` pour ajouter de fausse données.