import { useEffect, useState } from 'react';

export function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/dashboard/prediction/')
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const getStatusFromRisk = (score) => {
    return score > 0.5 ? 'Fraud' : 'Normal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Fraud':
        return 'bg-red-100 text-red-800';
      case 'Normal':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score) => {
    if (score >= 0.7) return 'text-red-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Merchant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Risk Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((t, index) => {
              const status = getStatusFromRisk(t.FraudProbability);

              return (
                <tr
                  key={index}
                  onClick={() => setSelectedTransaction(t)}
                  className={`cursor-pointer hover:bg-gray-50 ${selectedTransaction === t ? 'bg-blue-50' : ''
                    }`}
                >
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {t._id || index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {t.Timestamp || '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {t.UserID}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    ${Number(t.Amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {t.Merchant}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-semibold ${getRiskColor(
                      t.FraudProbability
                    )}`}
                  >
                    {Number(t.FraudProbability).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusColor(
                        status
                      )}`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
