import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Section */}
      <div
        style={{
          marginLeft: '260px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        {/* Navbar */}
        <div style={{ flexShrink: 0 }}>
          <Navbar />
        </div>

        {/* Content Area (scroll here) */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',   // ✅ ONLY THIS SCROLLS
            padding: '20px',
          }}
        >
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default AdminLayout;