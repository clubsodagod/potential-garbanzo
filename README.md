# 🏡 Lead Flow — Real Estate Lead Management Platform

**Lead Flow** is a modern, full-stack real estate lead management system built with Next.js, MongoDB, and TypeScript. It empowers real estate investors, acquisition teams, and lead managers to efficiently upload, organize, contact, and track interactions with off-market property leads.

---

## 🚀 Features

- 🗂️ **Lead List Management** — Upload and categorize Excel files with property lead data
- 👥 **Contact Intelligence** — View owners, phone numbers, emails, and property details
- 📞 **Action Logging** — Record calls, texts, emails, and notes with full history timeline
- 🔁 **Multi-step Forms** — Clean, validated user onboarding with authentication
- 📊 **Interaction History** — Visual logs of communications for accountability and insights
- 🔐 **Role-based Access** — Session-aware, permission-ready with NextAuth
- 🎨 **Responsive UI** — Built with Material UI (MUI) and Lottie animations

---

## 🧑‍💻 Getting Started

To start the development server locally:

```bash
npm install
npm run dev

Or with your preferred package manager:

# yarn
yarn install
yarn dev

# pnpm
pnpm install
pnpm dev

# bun
bun install
bun dev


🛠 Tech Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

Database: MongoDB + Mongoose

UI: Material UI (MUI)

Auth: NextAuth (Credentials Provider)

State & Forms: React Hook Form

Notifications: react-hot-toast

Styling: Tailwind + MUI

File Parsing: XLSX → Custom parser to structured lead schema

Animations: Lottie (.lottie format)

📁 Environment Variables
Create a .env file in the root of your project and add the following:

env
Copy
Edit
# MongoDB
MONGODB_URI=mongodb+srv://...
MONGODB_USER=your_user
MONGODB_PASS=your_pass
MONGODB_DB_NAME=the-lead-flow
MONGODB_AUTH_SOURCE=admin
MONGODB_SOCKET_TIMEOUT_MS=30000
MONGODB_SERVER_SELECTION_TIMEOUT_MS=5000

# Auth
AUTH_GOOGLE_ID=...
AUTH_GOOGLE_SECRET=...

# App URLs
NEXT_PUBLIC_DEVELOPMENT_URL=http://localhost:3000
NEXT_PUBLIC_PRODUCTION_URL=https://your-domain.com
NEXT_PUBLIC_DEVELOPMENT_API_URL=http://localhost:3000/api
NEXT_PUBLIC_PRODUCTION_API_URL=https://your-domain.com/api
📦 Project Structure
bash
Copy
Edit
/_database/             # Mongoose models and DB connection
/_library/              # Constants, types, themes, utilities
/_utility/              # Fetchers, form helpers, serializers
/app/                   # App Router structure (routes, modules)
  |_ login/
  |_ register/
  |_ dashboard/
  |_ leads/
🌍 Deployment
We recommend deploying with Vercel, the creators of Next.js.

bash
Copy
Edit
# Connect your Git repo to Vercel
# Add environment variables in Vercel dashboard
# Push to `main` or create a PR to trigger deployment
For detailed instructions, refer to:
👉 Next.js deployment docs

🤝 Contributing
Contributions, issue reports, and feature requests are welcome!

To get started:

bash
Copy
Edit
# Fork this repo
# Create a new feature branch
git checkout -b feature/your-feature-name

# Push changes and open a PR
git commit -m "✨ Add awesome feature"
git push origin feature/your-feature-name
📬 Contact
Have questions or want to partner with us?

📧 Email: self@maliek-davis.com
🌐 Website: https://maliek-davis.com

© License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Let me know if you'd like:

- A clickable **table of contents**
- Deployment instructions for **Docker**
- Dynamic badges for CI/CD, license, or Vercel status
- Project screenshots or animated walkthroughs

Would you like this saved as a `README.md` file now?
