# 🛍️ Vibe Commerce — Mock E-Com Cart

A full-stack shopping cart web app built for the **Vibe Commerce Internship Screening Assignment**.
This project demonstrates frontend–backend integration, REST APIs, database persistence, and a responsive UI.

---

## 📦 Tech Stack
| Layer | Technology |
|-------|-------------|
| Frontend | React, Axios, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Atlas or local) |
| Communication | REST APIs |
| Tools | IntelliJ IDEA / VS Code, GitHub, Postman |

---

## 🚀 Features
- ✅ 5–10 mock products displayed in a grid layout
- ✅ Add or remove items from cart
- ✅ Dynamic total and quantity updates
- ✅ Checkout form (Name + Email)
- ✅ Mock receipt with total + timestamp
- ✅ Transaction details stored in MongoDB
- ✅ Responsive UI for desktop and mobile
- ✅ Error handling on all routes

---

## 🗂️ Project Structure
```
mock-ecom-cart/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env (not committed)
│   └── node_modules/
│
└── frontend/
    ├── src/
    ├── package.json
    ├── public/
    └── node_modules/
```

---

## ⚙️ Backend API Overview
| Endpoint | Method | Description |
|-----------|---------|-------------|
| `/api/products` | GET | Fetch mock products |
| `/api/cart` | POST | Add product to cart `{ productId, qty }` |
| `/api/cart` | GET | Get all cart items + total |
| `/api/cart/:id` | DELETE | Remove item by ID |
| `/api/checkout` | POST | Checkout `{ cartItems, name, email }` |
| `/api/transactions` | GET | Get all past purchases (optional) |

---

## 🧰 Setup Instructions
### 1️⃣ Clone Repository
```bash
git clone https://github.com/M1D0R1x/mock-ecom-cart.git
cd mock-ecom-cart
```

### 2️⃣ Setup Backend
```bash
cd backend
npm install
```

#### Create `.env` file inside `backend/`
```
MONGODB_URI=<your MongoDB connection string here>
```
#### Start Backend Server
```bash
cd backend
node server.js
```
Expected output:
```
✅ MongoDB connected
🚀 Server running on port 5000
```

### 3️⃣ Setup Frontend
Open another terminal:
```bash
cd frontend
npm install
npm start
```
Visit: [http://localhost:3000](http://localhost:3000)

---

## ✅ Verify App Flow
1. Open browser → View products
2. Add items to cart
3. View cart + total
4. Checkout → enter name & email
5. See receipt modal (total + timestamp)
6. Check MongoDB → new `transactions` record

---

## 🧠 Notes
- Backend port: **5000**
- Frontend port: **3000**
- `.gitignore` excludes sensitive files like `.env`, `.idea/`, `node_modules/`

---

## 🧪 Testing APIs (Postman)
| API | Method | Example Body |
|------|--------|--------------|
| `/api/products` | GET | — |
| `/api/cart` | POST | `{ "productId": 2, "qty": 1 }` |
| `/api/cart` | GET | — |
| `/api/cart/:id` | DELETE | — |
| `/api/checkout` | POST | `{ "cartItems": [...], "name": "John", "email": "john@example.com" }` |
| `/api/transactions` | GET | — |

---

## 🧾 Example `.env.example`
Create `backend/.env.example`:
```
# Copy this to .env and replace with your own MongoDB URI
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/mock_ecom?retryWrites=true&w=majority
```

---

## 🎥 Demo
👉 Add your Loom or YouTube link here.

---

## 👨‍💻 Author
**Veera**  
Full-Stack Developer
📧 veerababusaviti21@gmail.com
🔗 https://github.com/M1D0R1x

