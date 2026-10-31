import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function ChangePassword() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear any autofilled credentials on page load
  useEffect(() => {
    setTimeout(() => {
      const emailInput = document.querySelector('input[name="email"]');
      const oldPasswordInput = document.querySelector('input[name="oldPassword"]');
      const newPasswordInput = document.querySelector('input[name="newPassword"]');
      
      if (emailInput) emailInput.value = '';
      if (oldPasswordInput) oldPasswordInput.value = '';
      if (newPasswordInput) newPasswordInput.value = '';
      
      setFormData({
        email: '',
        oldPassword: '',
        newPassword: ''
      });
    }, 100);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');
    setLoading(true);

    try {
      const response = await api.put('/auth/change-password', formData);

      if (response.data.success) {
        setMessage('Password changed successfully. Redirecting to login...');

        // Clear any previous session
        localStorage.clear();

        // Redirect after short delay
        setTimeout(() => {
          navigate('/login', { replace: true });
        }, 1500);

      } else {
        setError(response.data.message || 'Password change failed');
      }

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow" style={{ width: '100%', maxWidth: '420px' }}>
        <div className="card-body p-4">

          <h4 className="text-center mb-4">Change Password</h4>

          {message && (
            <div className="alert alert-success">
              {message}
            </div>
          )}

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="new-password">

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Old Password</label>
              <input
                type="password"
                className="form-control"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                required
                disabled={loading}
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default ChangePassword;