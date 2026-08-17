import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../../components/layout/Header';
import SellerSidebar from '../../../components/seller/Sidebar';
import { authService } from '../../../services/authService';
import Button from '../../../components/common/Button';

export default function SellerWallet() {
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

  const walletData = {
    availableBalance: 850000,
    pendingBalance: 350000,
    totalEarnings: 5850000,
    currency: 'BIF',
  };

  const transactions = [
    { id: 'TXN-001', type: 'credit', amount: 85000, description: 'Order #BUR10291', date: '2024-08-15' },
    { id: 'TXN-002', type: 'debit', amount: 8500, description: 'BURUMAL commission (10%)', date: '2024-08-15' },
    { id: 'TXN-003', type: 'credit', amount: 120000, description: 'Order #BUR10284', date: '2024-08-14' },
    { id: 'TXN-004', type: 'debit', amount: 12000, description: 'BURUMAL commission (10%)', date: '2024-08-14' },
    { id: 'TXN-005', type: 'credit', amount: 450000, description: 'Order #BUR10273', date: '2024-08-13' },
    { id: 'TXN-006', type: 'debit', amount: 45000, description: 'BURUMAL commission (10%)', date: '2024-08-13' },
    { id: 'TXN-007', type: 'debit', amount: 250000, description: 'Payout Request #PAYOUT-001', date: '2024-08-10' },
    { id: 'TXN-008', type: 'credit', amount: 180000, description: 'Order #BUR10265', date: '2024-08-09' },
    { id: 'TXN-009', type: 'debit', amount: 18000, description: 'BURUMAL commission (10%)', date: '2024-08-09' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pb-20 md:pb-0">
        <div className="flex">
          <SellerSidebar />
          <div className="flex-1 ml-64 p-8">
            <h1 className="text-2xl font-bold mb-6">💰 My Wallet</h1>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                <p className="text-green-100 text-sm mb-1">Available Balance</p>
                <p className="text-3xl font-bold mb-2">{walletData.availableBalance.toLocaleString()} {walletData.currency}</p>
                <Link to="/seller/payouts">
                  <Button className="bg-white text-green-600 hover:bg-gray-100">Request Payout →</Button>
                </Link>
              </div>
              <div className="card">
                <p className="text-gray-600 text-sm mb-1">Pending Balance</p>
                <p className="text-3xl font-bold mb-2">{walletData.pendingBalance.toLocaleString()} {walletData.currency}</p>
                <p className="text-sm text-gray-500">Funds being processed</p>
              </div>
              <div className="card">
                <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
                <p className="text-3xl font-bold mb-2">{walletData.totalEarnings.toLocaleString()} {walletData.currency}</p>
                <p className="text-sm text-gray-500">All-time earnings</p>
              </div>
            </div>

            {/* Transaction History */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Transaction History</h2>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>All Transactions</option>
                    <option>Credits Only</option>
                    <option>Debits Only</option>
                  </select>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Last 30 Days</option>
                    <option>Last 7 Days</option>
                    <option>Last 90 Days</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Transaction ID</th>
                      <th className="text-left p-4">Description</th>
                      <th className="text-left p-4">Date</th>
                      <th className="text-right p-4">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <tr key={txn.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium">{txn.id}</td>
                        <td className="p-4">{txn.description}</td>
                        <td className="p-4 text-gray-600">{txn.date}</td>
                        <td className={`p-4 text-right font-semibold ${txn.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                          {txn.type === 'credit' ? '+' : '-'}{txn.amount.toLocaleString()} {walletData.currency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Commission Info */}
            <div className="card mt-6 bg-blue-50 border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">💡 Commission Information</h3>
              <p className="text-sm text-blue-700">
                BURUMAL charges a 10% commission on all sales. This amount is automatically deducted from each order before the remaining amount is credited to your available balance.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
