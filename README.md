# 🏥 Hospital Management System - Frontend

A modern, responsive Hospital Management System frontend built with **React**, **Vite**, and **Material-UI**, providing an intuitive interface for managing hospital operations.

---

## 🚀 Live Demo

- **Frontend Application:** [https://hospital-management-frontend-xi.vercel.app](https://hospital-management-frontend-xi.vercel.app)
- **Backend API:** [https://sk-hospital-management.onrender.com](https://sk-hospital-management.onrender.com)

---

## ✨ Features

### User Interface
- 🎨 **Modern UI Design** - Clean and intuitive Material-UI components
- 📱 **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- 🌓 **Theme Support** - Professional color scheme and styling
- 🔔 **Real-time Notifications** - Toast notifications for user actions
- 📊 **Interactive Dashboard** - Visual charts and statistics

### Core Functionality
- 🔐 **Authentication System** - Secure login and registration
- 👤 **Role-based Access** - Different views for Admin, Doctor, and Patient
- 📋 **Patient Management** - Complete patient information system
- 👨‍⚕️ **Doctor Management** - Doctor profiles and specializations
- 📅 **Appointment Scheduling** - Calendar-based appointment booking
- 💊 **Prescription Management** - Create and view prescriptions
- 🧪 **Lab Tests** - Order and track laboratory tests
- 💰 **Billing System** - Generate and manage invoices
- 📈 **Reports & Analytics** - Visual reports and data insights

---

## 🛠️ Technology Stack

- **Framework:** React 18
- **Build Tool:** Vite
- **UI Library:** Material-UI (MUI)
- **HTTP Client:** Axios
- **Routing:** React Router DOM
- **Charts:** Recharts / Chart.js
- **Deployment:** Vercel
- **State Management:** React Hooks

---

## 📦 Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.x",
  "@mui/material": "^5.x",
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x",
  "axios": "^1.x",
  "recharts": "^2.x"
}
```

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/DopatiSudheer/hospital-management-frontend.git
cd hospital-management-frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Configure Environment Variables**

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:8080/api
```

For production:
```env
VITE_API_URL=https://sk-hospital-management.onrender.com/api
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

The application will start on `http://localhost:5173`

5. **Build for production**
```bash
npm run build
# or
yarn build
```

---

## 📁 Project Structure

```
hospital-management-frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/              # Images and static files
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Cards.jsx
│   │   ├── Tables.jsx
│   │   ├── Notifications.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/              # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Patients.jsx
│   │   ├── Doctors.jsx
│   │   ├── Appointments.jsx
│   │   ├── Billing.jsx
│   │   ├── LabTests.jsx
│   │   ├── Prescriptions.jsx
│   │   ├── Medicines.jsx
│   │   └── Reports.jsx
│   ├── services/           # API service calls
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── patientService.js
│   │   ├── doctorService.js
│   │   └── ...
│   ├── layouts/            # Layout components
│   │   └── AdminLayout.jsx
│   ├── styles/             # CSS and styling
│   │   ├── global.css
│   │   ├── animations.css
│   │   └── theme.js
│   ├── utils/              # Utility functions
│   │   └── roleUtils.js
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── vercel.json
└── README.md
```

---

## 🎨 Pages & Routes

| Route | Component | Access | Description |
|-------|-----------|--------|-------------|
| `/` | Login | Public | User login page |
| `/register` | Register | Public | New user registration |
| `/dashboard` | Dashboard | Private | Main dashboard with statistics |
| `/patients` | Patients | Admin | Patient management |
| `/doctors` | Doctors | Admin | Doctor management |
| `/appointments` | Appointments | All | Appointment scheduling |
| `/billing` | Billing | Admin/Doctor | Billing and invoices |
| `/prescriptions` | Prescriptions | Doctor/Patient | Prescription management |
| `/lab-tests` | LabTests | All | Laboratory tests |
| `/medicines` | Medicines | Admin | Medicine inventory |
| `/reports` | Reports | Admin/Doctor | Generate reports |

---

## 🔐 User Roles & Permissions

### Admin
- ✅ Full system access
- ✅ Manage doctors and patients
- ✅ View all appointments
- ✅ Access billing and reports
- ✅ Manage medicines inventory

### Doctor
- ✅ View assigned appointments
- ✅ Create prescriptions
- ✅ Order lab tests
- ✅ View patient medical records
- ✅ Update appointment status

### Patient
- ✅ View personal medical records
- ✅ Book appointments
- ✅ View prescriptions
- ✅ View lab test results
- ✅ View billing history

---

## 🔑 Default Login Credentials

**Admin:**
- Email: `admin@hospital.com`
- Password: `admin@123`

**Test Doctor:**
- Email: `sanju@gmail.com`
- Password: `sanju@26`

**Test Patient:**
- Email: `sudheer@gmail.com`
- Password: `sudheer@14`

---

## 🌐 API Integration

The frontend communicates with the backend through RESTful APIs:

```javascript
// Example API configuration (src/services/api.js)
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const role = getUserRole();
  if (role) {
    config.headers['X-User-Role'] = role;
  }
  return config;
});

export default api;
```

---

## 🎨 Styling & Theme

### Color Scheme
- Primary: `#1976d2` (Blue)
- Secondary: `#dc004e` (Pink)
- Success: `#4caf50` (Green)
- Warning: `#ff9800` (Orange)
- Error: `#f44336` (Red)

### Custom Styling
- CSS Modules for component-specific styles
- Global styles in `src/styles/global.css`
- Material-UI theme customization in `src/styles/theme.js`

---

## 🚀 Deployment

### Deployed on Vercel

**Automatic Deployment:**
1. Push to `main` branch on GitHub
2. Vercel automatically builds and deploys
3. Environment variables configured in Vercel dashboard
4. Instant global CDN distribution

**Production URL:** [https://hospital-management-frontend-xi.vercel.app](https://hospital-management-frontend-xi.vercel.app)

### Vercel Configuration

`vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Environment Variables (Vercel)
```
VITE_API_URL=https://sk-hospital-management.onrender.com/api
```

---

## 🧪 Testing

Run tests (if configured):
```bash
npm run test
```

---

## 🔍 Code Quality

### Linting
```bash
npm run lint
```

### Format Code
```bash
npm run format
```

---

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px and up)
- 📱 Tablets (768px and up)
- 💻 Desktops (1024px and up)
- 🖥️ Large screens (1440px and up)

---

## ⚡ Performance Optimization

- ✅ Code splitting with React Router
- ✅ Lazy loading of components
- ✅ Image optimization
- ✅ Vite's fast HMR (Hot Module Replacement)
- ✅ Production build minification
- ✅ CDN delivery via Vercel

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 🐛 Troubleshooting

### Common Issues

**1. API Connection Failed**
- Check if backend is running
- Verify `VITE_API_URL` in `.env` file
- Check CORS configuration on backend

**2. Build Errors**
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm run build --force`

**3. Login Issues**
- Verify credentials with admin
- Check browser console for errors
- Ensure backend is deployed and running

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Developer

**Sudheer Kumar Dopati**

- GitHub: [@DopatiSudheer](https://github.com/DopatiSudheer)
- Project: Hospital Management System
- Year: 2024

---

## 🎯 Future Enhancements

- [ ] Dark mode support
- [ ] Multi-language support (i18n)
- [ ] PWA (Progressive Web App) support
- [ ] Real-time notifications with WebSocket
- [ ] Advanced search and filters
- [ ] Export data to PDF/Excel
- [ ] Video consultation integration
- [ ] Mobile app (React Native)

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Check documentation
- Contact project maintainer

---

## ⭐ Acknowledgments

- React Team
- Vite Team
- Material-UI Team
- Vercel Platform
- Open Source Community

---

**Made with ❤️ for better healthcare management**
