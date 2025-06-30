# 🕶️ IMF Gadget API

The **IMF Gadget API** is a secure backend service designed for the Impossible Missions Force to manage, track, and decommission high-tech gadgets. Built using **Node.js**, **Express**, **Prisma**, and **PostgreSQL**, this API supports advanced features like soft delete, simulated self-destruct, authentication, and filtering by status.

---

## 🚀 Features

- 🔐 JWT-based authentication system (Register/Login)
- 📦 Full CRUD for gadget inventory
- 🧨 Trigger self-destruct with confirmation code (simulated)
- 🔍 Filter gadgets by status (`Available`, `Deployed`, etc.)
- 🧬 Random codename generation for each gadget
- 🎯 Random "mission success probability" for each gadget
- 🗃️ Soft deletion using decommission timestamp
- ☁️ Deployed on **Render**, using **Neon DB**
- 📪 Fully documented with Postman

---

## 🛠 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (via Neon)
- **ORM**: Prisma
- **Auth**: JWT (jsonwebtoken)
- **Deployment**: Render
- **Documentation**: Postman Collection

---

## 📁 Project Structure

```
├── prisma/
│   └── schema.prisma       # Prisma DB schema
├── src/
│   ├── controllers/        # Auth & Gadget logic
│   ├── middleware/         # Auth middleware
│   ├── routes/             # Express routers
│   ├── utils/              # Codename + probability generator
│   └── index.js            # App entry point
├── .env
├── .gitignore
└── package.json
```

---

## 📌 Environment Variables

Create a `.env` file at the root using the template below:

```env
DATABASE_URL="postgres://<user>:<password>@<host>/<db>?sslmode=require"
JWT_SECRET="your_super_secret_key"
```

---
## 📦 Getting Started Locally

```bash
git clone https://github.com/Aayush1805/IMF-Gadget.git

npm install                # Install Required Packages
npx prisma generate
npx prisma db push         # Push schema to Neon DB

npm run start              # Start server
```

---

## 🌐 Live API

🔗 **Base URL**:  
`https://imf-gadget-api-llu6.onrender.com/api`

Use this as `{{base_url}}` in Postman.

---

## 🧪 Postman Collection

📁 [Open Postman Collection](https://aayuush-7729303.postman.co/workspace/Aayuush's-Workspace~1858d890-9e06-4219-8f85-016de96e7cc4/collection/46290527-f5b14149-9530-4a17-aad6-46c99e1069af?action=share&creator=46290527&active-environment=46290527-9e0a208b-d261-4f66-8cc8-90031e09b4c6)

### 📌 Environment Variables (in Postman)

| Variable   | Value                         | Notes                      |
|------------|----------------------------------------|----------------------------|
| `base_url` | `https://imf-gadget-api-llu6.onrender.com/api` | Set this first             |
| `token`    | (from login response)                 | Add manually after login   |

> 🔐 **Important:**  
> When you import this collection, **the `token` will be empty**.  
> After logging in with `/auth/login`, copy the token and paste it into the Postman environment manually under `token`.

---

## 🔐 Authentication Endpoints

| Method | Endpoint         | Description              |
|--------|------------------|--------------------------|
| POST   | `/auth/register` | Register new user        |
| POST   | `/auth/login`    | Get JWT access token     |

---

## 🧰 Gadget Endpoints

All routes below require a valid JWT token.

| Method | Endpoint                         | Description                             |
|--------|----------------------------------|-----------------------------------------|
| GET    | `/gadgets`                      | Fetch all gadgets (with success %s)     |
| GET    | `/gadgets?status=Deployed`      | Filter gadgets by status                |
| POST   | `/gadgets`                      | Add new gadget                          |
| PATCH  | `/gadgets/:id`                  | Update gadget name/status               |
| DELETE | `/gadgets/:id`                  | Soft delete (mark as decommissioned)    |
| POST   | `/gadgets/:id/self-destruct`    | Trigger a self-destruct confirmation    |

---

## 📌 Status Values (Enum)

You may only use these values for `status`:

- `Available`
- `Deployed`
- `Destroyed`
- `Decommissioned`


##

> **"This README will self-destruct in 5 seconds..."**
##