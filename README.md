# 🎓 CampusConnect – A Collaborative Academic Hub

CampusConnect is a full-stack web application that acts as a centralized academic hub for college students and teachers. It facilitates sharing of study materials, asking/answering questions, posting announcements, and building collaborative study communities.

---

## 📌 Features

### 👥 Roles & Permissions

| Role     | Permissions |
|----------|-------------|
| Student  | Register, log in, view courses, upload resources, ask/answer questions, join study groups |
| Teacher  | All student permissions + post announcements and verify resources/answers |

### 🧠 Functional Highlights

- ✅ Authentication via Firebase (Email & Password)
- 📚 Course enrollment & dashboard
- 📂 File upload (PDFs, images) to Firebase Storage
- 🗃️ Firestore-based Q&A and announcement modules
- 🌟 Verified answers/resources (Teacher-only privilege)

---

## 🛠️ Tech Stack

### Frontend
- **React** (Functional components + Hooks)
- **Vite** (Fast dev environment)
- **Tailwind CSS** (Utility-first styling)
- **shadcn/ui** (Modern UI components)
- **React Router DOM**
- **Context API** (Global state management)

### Backend
- **Node.js + Express** (Used for static serving and future APIs)
- **CORS, dotenv**

### Firebase
- **Firestore** (NoSQL database)
- **Firebase Auth**
- **Firebase Storage**

---

## 🗂️ Firestore Database Schema

### `users`
- `name` (String)
- `email` (String)
- `role` ("student" or "teacher")
- `enrolledCourses` (Array of course IDs)

### `courses`
- `courseName` (String)
- `courseCode` (String)
- `teacherId` (String)
- `teacherName` (String)

### `resources`
- `courseId` (Reference)
- `title` (String)
- `fileUrl` (String)
- `fileType` (pdf/jpg)
- `uploadedByUid` / `uploadedByName` (String)
- `createdAt` (Timestamp)
- `upvotes` (Number)
- `isVerified` (Boolean)

### `questions`
- `courseId` (Reference)
- `title` (String)
- `details` (String)
- `askedByUid` / `askedByName` (String)
- `createdAt` (Timestamp)
- `isResolved` (Boolean)

### `answers`
- `questionId` (Reference)
- `answerText` (String)
- `answeredByUid` / `answeredByName` (String)
- `createdAt` (Timestamp)
- `isAccepted` (Boolean)

### `announcements`
- `courseId` (Reference)
- `text` (String)
- `postedByUid` (String)
- `createdAt` (Timestamp)

---

## 📁 Project Structure

campus-connect/
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── components/ # Navbar, ResourceCard, etc.
│ │ ├── pages/ # Login, Dashboard, CoursePage
│ │ ├── context/ # Auth & global state
│ │ ├── firebase/ # Firebase config & methods
│ │ └── App.jsx
│ └── package.json
├── server/ # Express server
│ ├── server.js
│ └── package.json
├── .gitignore
├── README.md
└── package.json # Root: build scripts for Render

markdown
Copy
Edit

---

## 🔐 Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a project and enable:
   - **Email/Password Auth**
   - **Firestore Database**
   - **Firebase Storage**
3. Add a `.env` file in `client/`:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
🚀 Local Development
Prerequisites:
Node.js (v18+ recommended)

npm

Steps:
bash
Copy
Edit
# 1. Clone the repo
git clone https://github.com/your-username/campus-connect.git
cd campus-connect

# 2. Install dependencies
cd client && npm install
cd ../server && npm install

# 3. Run frontend
cd ../client
npm run dev

# 4. (Optional) Serve Express backend
cd ../server
node server.js
