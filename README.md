# E-Commerce App – Docker Run Guide

---

## Prerequisites

* Docker
* Docker Compose

---

## How to Run the Application

From the project root directory:

```bash
docker compose up --build -d
```

---

## Verify Running Containers

```bash
docker ps
```

You should see containers for:

* mongo
* product
* user
* cart
* frontend

---

## Access the Application

* Frontend: [http://localhost](http://localhost)
* Product API: [http://localhost:9000](http://localhost:9000)
* User API: [http://localhost:9001](http://localhost:9001)
* Cart API: [http://localhost:9003](http://localhost:9003)

---

## View Logs (Optional)

```bash
docker logs product
docker logs user
docker logs cart
docker logs mongo
```

---

## Stop the Application

```bash
docker compose down
```

To remove MongoDB data as well:

```bash
docker compose down -v
```
# Mern_ECom_Microservice_App
