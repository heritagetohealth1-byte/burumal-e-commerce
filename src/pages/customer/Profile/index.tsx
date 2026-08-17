import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerSidebar from '../../../components/customer/Sidebar';
import { authService } from '../../../services/authService';

export default function CustomerProfile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(authService.getUser());
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    email: user?.email || '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save button clicked', formData);
    
    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.phone.trim()) {
      alert('Please fill in all required fields (First Name, Last Name, Phone)');
      return;
    }
    
    if (user) {
      const updatedUser = {
        ...user,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim(),
        email: formData.email?.trim() || '',
      };
      console.log('Updating user with:', updatedUser);
      authService.updateUser(updatedUser);
      setUser(updatedUser); // Update local state to reflect changes
      
      setSaveSuccess(true);
      setIsEditing(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleCancel = () => {
    // Reset form to current user data
    setFormData({
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: user?.phone || '',
      email: user?.email || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <CustomerSidebar />

      <main className="flex-1 pb-20 lg:pb-0">
        <div className="container py-8">
          <h1 className="text-2xl font-bold mb-6">👤 My Profile</h1>

          <div className="max-w-2xl">
            {/* Success Message */}
            {saveSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6">
                Profile updated successfully!
              </div>
            )}

            {/* Profile Card */}
            <div className="card text-center mb-6">
              <div className="w-24 h-24 bg-primary-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
              <h2 className="font-bold text-lg">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-600 mb-2">{user?.phone}</p>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                ✓ Verified Account
              </span>
            </div>

            {/* Personal Information */}
            <div className="card relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Personal Information</h2>
                {!isEditing && (
                  <button
                    onClick={handleEditClick}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSave} className="space-y-4 relative z-20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
                        autoFocus
                        readOnly={false}
                        style={{ pointerEvents: 'auto', userSelect: 'text', WebkitUserSelect: 'text' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
                        readOnly={false}
                        style={{ pointerEvents: 'auto', userSelect: 'text', WebkitUserSelect: 'text' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
                      placeholder="+257 XX XXX XXX"
                      readOnly={false}
                      style={{ pointerEvents: 'auto', userSelect: 'text', WebkitUserSelect: 'text' }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
                      placeholder="your@email.com"
                      readOnly={false}
                      style={{ pointerEvents: 'auto', userSelect: 'text', WebkitUserSelect: 'text' }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">First Name</p>
                      <p className="font-medium">{user?.firstName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Last Name</p>
                      <p className="font-medium">{user?.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone Number</p>
                    <p className="font-medium">{user?.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{user?.email || 'Not provided'}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
