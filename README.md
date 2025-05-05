# 🛍️ UniBazzar

Welcome to **UniBazzar** — your one-stop campus marketplace for textbooks, notes, tutoring, and more!
This project is a full-stack web application built with React (frontend) and a Django REST API (backend, not included here).

---

## 🚀 Features

- 🏫 Marketplace for students, merchants, and tutors
- 📚 Buy and sell textbooks, notes, and learning materials
- 👨‍🏫 Offer and find tutoring services
- 🍔 List and discover food and local services
- 🛒 Shopping cart with persistent state
- 🔒 Authentication and role-based dashboards
- 🌙 Light/Dark mode support
- 📱 Responsive design for all devices

---

## 🛠️ Tech Stack

- **Frontend:** React, Redux Toolkit, Tailwind CSS, React Router
- **Backend:** Django REST Framework (not included in this repo)
- **State Management:** Redux Toolkit
- **API:** JWT Bearer Authentication

---

## 🖥️ Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/unibazzar-frontend.git
cd unibazzar-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

- By default, the frontend expects the backend API at `http://localhost:8000/`.
- If your backend runs elsewhere, update API URLs in `src/pages/MarketplacePage.jsx` and related files.

### 4. Start the Development Server

```bash
npm run dev
```

- The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

### 5. Backend Setup (Required)

- You must have the Django REST API running at `http://localhost:8000/`.
- Ensure CORS is enabled for your frontend origin in the backend settings.

---

## 🧑‍💻 Project Structure

```
src/
  components/         # Reusable UI and feature components
  pages/              # Main pages (Marketplace, Login, Profile, etc.)
  redux/              # Redux slices and store
  mock/               # Mock data for development
  styles/             # Tailwind and global CSS
  App.jsx             # Main app entry
  main.jsx            # ReactDOM entry
```

---

## 🛒 Key Features & Usage

- **Marketplace:** Browse and filter products by category (Notes, Tutoring, etc.)
- **Add to Cart:** Click the cart icon on any product to add it to your cart.
- **Cart Persistence:** Cart state is saved in localStorage.
- **Authentication:** Login required for most features.
- **Role Dashboards:** Merchants, students, tutors, and admins have custom dashboards.

---

## 📝 Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build for production
- `npm run lint` — Lint the codebase

---

## 🧩 Customization

- **API URLs:** Change API endpoints in `src/pages/MarketplacePage.jsx` if your backend is on a different host/port.
- **Theme:** Tailwind CSS is used for styling. Customize in `src/index.css` or `tailwind.config.js`.
- **Mock Data:** Use files in `src/mock/` for local testing without a backend.

---

## 🐞 Troubleshooting

- **401 Unauthorized:** Make sure you are logged in and your token is valid.
- **CORS Errors:** Ensure your backend allows requests from your frontend's origin.
- **API Not Found:** Check that your backend is running and accessible at the expected URL.

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgements

- Built with ❤️ by the UniBazzar team.
- Thanks to all open-source contributors!
