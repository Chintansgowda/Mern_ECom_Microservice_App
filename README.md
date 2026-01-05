# MERN Microservices E‑Commerce Application

This project is a **production‑style MERN microservices application** containerized with **Docker**, orchestrated using **Docker Compose**, and exposed via **Nginx reverse proxy with path‑based routing**.

---

## 🧱 Architecture Overview

```
Browser
   |
   |  http://<EC2_PUBLIC_IP>
   v
Nginx (frontend-service :80)
   |
   |-- /user    → user-service :9001
   |-- /product → product-service :9000
   |-- /cart    → cart-service :9003
   |
MongoDB (mongo :27017)
```

* **Single entry point**: Nginx (port 80)
* **Backend services are NOT directly exposed to users**
* **Frontend calls APIs using relative paths** (`/user`, `/product`, `/cart`)

---


---

## 🧩 Services

### 1️ Frontend Service

* React + Vite
* Built using Node
* Served using **Nginx**
* Handles SPA routing + API reverse proxy

### 2️ User Service

* Node.js + Express
* Handles:

  * Register
  * Login
  * Profile
* Port: `9001` (internal)

### 3️ Product Service

* Node.js + Express
* Handles:

  * Product listing
  * Product details
  * Category filters
* Port: `9000` (internal)

### 4️ Cart Service

* Node.js + Express
* Handles:

  * Add to cart
  * View cart
  * Checkout
* Port: `9003` (internal)

### 5️ MongoDB

* Shared database
* Persistent storage using Docker volume

---

##  Accessing the Application

###  Frontend (ONLY entry point)

```
http://<EC2_PUBLIC_IP>
```

Example:

```
http://52.201.236.208
```

---

##  API Access (via Nginx)

### User APIs

```
/user
/user/login
/user/register
```

### Product APIs

```
/product
/product/<productId>
/filter/category/<category>
```

### Cart APIs

```
/cart
/cart/checkout
```

⚠️ **Do NOT access backend services using ports directly** (`9000/9001/9003`).

---

## 🐳 Docker Compose Usage

### Start all services

```
docker compose up -d
```

### Stop all services

```
docker compose down
```

### View running containers

```
docker ps
```

---

## 💾 Persistent Storage

MongoDB uses a named Docker volume:

```
volumes:
  mongo-data:
```

This ensures **data is not lost** when containers restart.

---

##  Environment Variables

Each backend service uses an `.env` file (loaded via Docker Compose):

Example (`env/product.env`):

```
PORT=9000
MONGO_HOST=mongo
MONGO_PORT=27017
MONGO_DBNAME=productdb
```

Mongo hostname is `mongo` because Docker provides **internal DNS resolution**.

---

##  Important Design Decisions

* ✔ Frontend never calls backend ports directly
* ✔ Nginx acts as **API Gateway**
* ✔ Path‑based routing instead of multiple ports
* ✔ Docker service names act as DNS hostnames
* ✔ Production‑ready structure

---

##  Troubleshooting

### Frontend loads but APIs fail

* Check `nginx.conf` path mappings
* Ensure frontend uses **relative paths** (`/product`, not `http://localhost:9000`)

### Mongo connection issues

* Verify `MONGO_DBNAME` matches inserted data
* Check Mongo container is running

### Check logs

```
docker logs frontend-service
docker logs user-service
docker logs product-service
docker logs cart-service
```

---

##  Future Enhancements

* HTTPS with TLS
* Remove backend port exposure completely
* Rate limiting in Nginx
* Kubernetes + Ingress migration
* CI/CD pipeline

---

##  Final Note

This setup follows **real industry practices**:

* Microservices
* API gateway pattern
* Secure networking
* Clean separation of concerns

🎉 **Well done on building a production‑style MERN system!**
