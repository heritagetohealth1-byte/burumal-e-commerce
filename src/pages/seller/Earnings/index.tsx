import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerEarnings() {
  const navigate = useNavigate();
  const user = authService.getUser();

  useEffect(() => {
    // Redirect unauthenticated users to login
    if (!user) {
      navigate('/auth/login');
      return;
    }
    // Redirect customers to access denied page with clear message
    if (user && user.role !== 'seller') {
      navigate('/access-denied');
      return;
    }
  }, [user, navigate]);

  const mockEarnings = {
    totalEarnings: 12500000,
    availableBalance: 8750000,
    pendingBalance: 3750000,
    thisMonth: 2500000,
    lastMonth: 1800000,
  };

  const recentTransactions = [
    { id: 1, type: 'sale', amount: 85000, date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'sale', amount: 65000, date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'withdrawal', amount: 500000, date: '2024-01-13', status: 'completed' },
    { id: 4, type: 'sale', amount: 450000, date: '2024-01-12', status: 'pending' },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sale': return 'text-green-600';
      case 'withdrawal': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Earnings</h1>
            <Button>Withdraw</Button>
          </div>

          {/* Earnings Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="card">
              <p className="text-gray-600 text-sm">Total Earnings</p>
              <p className="text-2xl font-bold">{(mockEarnings.totalEarnings / 1000000).toFixed(1)}M BIF</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Available</p>
              <p className="text-2xl font-bold text-green-600">{(mockEarnings.availableBalance / 1000000).toFixed(1)}M BIF</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{(mockEarnings.pendingBalance / 1000000).toFixed(1)}M BIF</p>
            </div>
            <div className="card">
              <p className="text-gray-600 text-sm">This Month</p>
              <p className="text-2xl font-bold">{(mockEarnings.thisMonth / 1000000).toFixed(1)}M BIF</p>
            </div>
          </div>

          {/* Monthly Comparison */}
          <div className="card mb-8">
            <h2 className="text-lg font-semibold mb-4">Monthly Earnings</h2>
            <div className="flex items-center space-x-8">
              <div>
                <p className="text-gray-600 text-sm">This Month</p>
                <p className="text-2xl font-bold text-green-600">{(mockEarnings.thisMonth / 1000000).toFixed(1)}M BIF</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Last Month</p>
                <p className="text-2xl font-bold">{(mockEarnings.lastMonth / 1000000).toFixed(1)}M BIF</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Growth</p>
                <p className="text-2xl font-bold text-green-600">+38.9%</p>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium capitalize">{transaction.type}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${getTypeColor(transaction.type)}`}>
                      {transaction.type === 'sale' ? '+' : '-'}
                      {transaction.amount.toLocaleString()} BIF
                    </p>
                    <span className="text-xs text-gray-600 capitalize">{transaction.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
