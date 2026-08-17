import Sidebar from '../../../components/admin/Sidebar';

export default function SuperAdminAuditLogs() {
  const mockAuditLogs = [
    { id: 1, admin: 'admin@burumal.bi', action: 'Seller suspended', target: 'Home Decor Plus', reason: 'Repeated customer complaints', date: '2024-08-15', time: '18:31', ip: '192.168.1.100' },
    { id: 2, admin: 'finance@burumal.bi', action: 'Payout approved', target: 'Maison XYZ', reason: 'Regular payout', date: '2024-08-15', time: '17:45', ip: '192.168.1.101' },
    { id: 3, admin: 'moderator@burumal.bi', action: 'Product approved', target: 'Samsung Galaxy S24', reason: 'Verified product', date: '2024-08-15', time: '16:20', ip: '192.168.1.102' },
    { id: 4, admin: 'admin@burumal.bi', action: 'User blocked', target: 'Annie Ntiranyibagira', reason: 'Fraudulent activity', date: '2024-08-14', time: '14:30', ip: '192.168.1.100' },
    { id: 5, admin: 'logistics@burumal.bi', action: 'Courier suspended', target: 'Burundi Express', reason: 'Low fulfillment rate', date: '2024-08-14', time: '12:15', ip: '192.168.1.103' },
    { id: 6, admin: 'marketing@burumal.bi', action: 'Campaign created', target: 'Summer Sale 2024', reason: 'Seasonal promotion', date: '2024-08-14', time: '10:00', ip: '192.168.1.104' },
    { id: 7, admin: 'admin@burumal.bi', action: 'Settings updated', target: 'Platform commission', reason: 'Rate adjustment', date: '2024-08-13', time: '15:45', ip: '192.168.1.100' },
  ];

  const getActionColor = (action: string) => {
    if (action.includes('suspended') || action.includes('blocked')) return 'bg-red-100 text-red-800';
    if (action.includes('approved') || action.includes('created')) return 'bg-green-100 text-green-800';
    if (action.includes('updated')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Audit Logs</h1>
          <p className="text-gray-600">Track all administrative actions for accountability</p>
        </div>

        {/* Audit Logs Table */}
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">ID</th>
                  <th className="text-left p-4">Admin</th>
                  <th className="text-left p-4">Action</th>
                  <th className="text-left p-4">Target</th>
                  <th className="text-left p-4">Reason</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Time</th>
                  <th className="text-left p-4">IP Address</th>
                </tr>
              </thead>
              <tbody>
                {mockAuditLogs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{log.id}</td>
                    <td className="p-4">{log.admin}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{log.target}</td>
                    <td className="p-4 text-gray-600">{log.reason}</td>
                    <td className="p-4">{log.date}</td>
                    <td className="p-4">{log.time}</td>
                    <td className="p-4 text-gray-600">{log.ip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
