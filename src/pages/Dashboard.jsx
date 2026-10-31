import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import dashboardService from '../services/dashboardService';
import { getUserRole } from '../utils/roleUtils'; // ✅ Added

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const role = getUserRole(); // ✅ Added
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchDashboardSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    if (location.pathname === '/dashboard' && !loading && !summary && !error) {
      fetchDashboardSummary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const fetchDashboardSummary = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardService.getDashboardSummary(role,user.id);
      if (response.success) {
        setSummary(response.data);
      } else {
        setError(response.message || 'Failed to load dashboard data');
      }
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch dashboard data. Please check if the backend is running on http://localhost:8080';
      setError(errorMessage);
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatValue = (value, isCurrency = false) => {
    if (value === null || value === undefined) {
      return '0';
    }
    if (isCurrency) {
      return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    }
    return value.toLocaleString('en-IN');
  };

  // ✅ Modified card logic ONLY
 let cardData = [];

if (summary) {

  const allCards = [
    {
      title: 'Total Patients',
      value: summary.totalPatients || 0,
      icon: '👥',
      bgGradient: 'linear-gradient(135deg, #e8f4f8 0%, #d1e7ed 100%)',
      borderColor: '#1a5f7a',
      iconBg: 'rgba(26, 95, 122, 0.1)',
      textColor: '#1a5f7a',
    },
    {
      title: 'Total Doctors',
      value: summary.totalDoctors || 0,
      icon: '👨‍⚕️',
      bgGradient: 'linear-gradient(135deg, #f0f7f2 0%, #e1ede5 100%)',
      borderColor: '#4a7c59',
      iconBg: 'rgba(74, 124, 89, 0.1)',
      textColor: '#4a7c59',
    },
    {
      title: 'Total Appointments',
      value: summary.totalAppointments || 0,
      icon: '📅',
      bgGradient: 'linear-gradient(135deg, #f0f5f7 0%, #e1eaf0 100%)',
      borderColor: '#5a8a9f',
      iconBg: 'rgba(90, 138, 159, 0.1)',
      textColor: '#5a8a9f',
    },
    {
      title: 'Total Bills',
      value: summary.totalBills || 0,
      icon: '📋',
      bgGradient: 'linear-gradient(135deg, #f5f3f9 0%, #ebe7f3 100%)',
      borderColor: '#6c5ce7',
      iconBg: 'rgba(108, 92, 231, 0.1)',
      textColor: '#6c5ce7',
    },
    {
      title: 'Total Revenue',
      value: summary.totalRevenue || 0,
      icon: '💰',
      bgGradient: 'linear-gradient(135deg, #fef5f2 0%, #fce8e0 100%)',
      borderColor: '#d97757',
      iconBg: 'rgba(217, 119, 87, 0.1)',
      textColor: '#d97757',
      isCurrency: true,
    },
    {
      title: 'Pending Payments',
      value: summary.pendingPayments || 0,
      icon: '⏳',
      bgGradient: 'linear-gradient(135deg, #fff8e8 0%, #fff1d1 100%)',
      borderColor: '#f39c12',
      iconBg: 'rgba(243, 156, 18, 0.1)',
      textColor: '#f39c12',
    },
  ];

  if (role === 'ADMIN') {
    cardData = allCards;
  }

  if (role === 'DOCTOR') {
    cardData = allCards.filter(card =>
      card.title === 'Total Appointments' ||
      card.title === 'Total Patients'
    );
  }

  if (role === 'PATIENT') {
    cardData = allCards.filter(card =>
      card.title === 'Total Appointments'
      
    );
  }
}

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2
          style={{
            fontSize: '28px',
            fontWeight: 600,
            color: '#1a1a1a',
            marginBottom: '8px',
            letterSpacing: '-0.3px',
          }}
        >
          Dashboard Overview
        </h2>
        <p
          style={{
            fontSize: '14px',
            color: '#6b7280',
            margin: 0,
            fontWeight: 400,
          }}
        >
          Monitor key metrics and system performance at a glance
        </p>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted mt-3" style={{ fontSize: '14px' }}>Loading dashboard data...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          <div className="d-flex align-items-center justify-content-between">
            <span>{error}</span>
            <button className="btn btn-sm" onClick={fetchDashboardSummary}>
              Retry
            </button>
          </div>
        </div>
      )}

      {!loading && !error && summary && (
        <div className="row g-4">
          {cardData.map((card, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div className="card border-0" style={{ borderRadius: '16px', background: card.bgGradient }}>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h6>{card.title}</h6>
                    <div>{card.icon}</div>
                  </div>
                  <h3>{formatValue(card.value, card.isCurrency)}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && summary && (
        <div style={{ marginTop: '3rem' }}>
          <div className="row g-3">
            <div className="col-md-6">
              <div>Last Updated</div>
              <div>
                {new Date().toLocaleString('en-IN')}
              </div>
            </div>
            <div className="col-md-6 text-md-end">
              <div>System Status</div>
              <div>Operational</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;