import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerSecurity() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const activeSessions = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Bujumbura, Burundi',
      lastActive: 'Now',
      current: true,
    },
    {
      id: '2',
      device: 'Mobile App on Android',
      location: 'Bujumbura, Burundi',
      lastActive: '2 hours ago',
      current: false,
    },
  ];

  const loginHistory = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'Bujumbura, Burundi',
      date: '16 Aug 2026, 10:30',
      status: 'Successful',
    },
    {
      id: '2',
      device: 'Chrome on Windows',
      location: 'Bujumbura, Burundi',
      date: '15 Aug 2026, 18:45',
      status: 'Successful',
    },
    {
      id: '3',
      device: 'Unknown device',
      location: 'Unknown',
      date: '14 Aug 2026, 03:20',
      status: 'Failed',
    },
  ];

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    alert('Password changed successfully!');
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleLogoutAllDevices = () => {
    if (confirm('Are you sure you want to log out from all devices?')) {
      alert('Logged out from all devices successfully!');
    }
  };

  const handleLogoutSession = (_sessionId: string) => {
    if (confirm('Are you sure you want to log out from this device?')) {
      alert('Logged out successfully!');
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />
      
      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">🔐 Security</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Change Password */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Password</h2>
              {!showPasswordForm ? (
                <div>
                  <p className="text-gray-600 mb-4">••••••••</p>
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Change Password
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Update Password
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPasswordForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Two-Factor Authentication */}
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Two-Factor Authentication</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 mb-1">Add an extra layer of security to your account</p>
                  <p className="text-sm text-gray-500">Status: Off</p>
                </div>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  Enable
                </button>
              </div>
            </div>

            {/* Active Sessions */}
            <div className="card lg:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Active Sessions</h2>
                <button
                  onClick={handleLogoutAllDevices}
                  className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Log out all devices
                </button>
              </div>
              <div className="space-y-3">
                {activeSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">💻</span>
                      <div>
                        <p className="font-medium">{session.device}</p>
                        <p className="text-sm text-gray-600">{session.location}</p>
                        <p className="text-sm text-gray-500">Last active: {session.lastActive}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {session.current && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                          Current session
                        </span>
                      )}
                      {!session.current && (
                        <button
                          onClick={() => handleLogoutSession(session.id)}
                          className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50"
                        >
                          Log out
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Login History */}
            <div className="card lg:col-span-2">
              <h2 className="text-lg font-semibold mb-4">Login History</h2>
              <div className="space-y-3">
                {loginHistory.map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{entry.status === 'Successful' ? '✅' : '❌'}</span>
                      <div>
                        <p className="font-medium">{entry.device}</p>
                        <p className="text-sm text-gray-600">{entry.location}</p>
                        <p className="text-sm text-gray-500">{entry.date}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      entry.status === 'Successful' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {entry.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="card mt-6 border-2 border-red-200">
            <h2 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
              </div>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    authService.logout();
                    window.location.href = '/';
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
