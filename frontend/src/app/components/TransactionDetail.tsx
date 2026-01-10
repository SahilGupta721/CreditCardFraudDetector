import { Transaction } from '../data/mockData';
import { featureImportance } from '../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X } from 'lucide-react';

interface TransactionDetailProps {
  transaction: Transaction | null;
  onClose: () => void;
}

export function TransactionDetail({ transaction, onClose }: TransactionDetailProps) {
  if (!transaction) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Fraud':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white border-l border-gray-200 shadow-xl overflow-y-auto z-50">
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Transaction Details</h2>
          <p className="text-sm text-gray-500 mt-1 font-mono">{transaction.id}</p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Risk Score Visualization */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Risk Score</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-gray-900">
                {(transaction.riskScore * 100).toFixed(1)}%
              </span>
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(transaction.status)}`}>
                {transaction.status}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full ${
                  transaction.riskScore >= 0.7 ? 'bg-red-500' :
                  transaction.riskScore >= 0.5 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${transaction.riskScore * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Transaction Information */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Transaction Information</h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-gray-500">Timestamp</dt>
              <dd className="text-sm text-gray-900 mt-1">{transaction.timestamp}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">User ID</dt>
              <dd className="text-sm text-gray-900 font-mono mt-1">{transaction.userId}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Amount</dt>
              <dd className="text-sm text-gray-900 mt-1 font-semibold">${transaction.amount.toFixed(2)}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Merchant</dt>
              <dd className="text-sm text-gray-900 mt-1">{transaction.merchant}</dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Location</dt>
              <dd className="text-sm text-gray-900 mt-1">{transaction.location}</dd>
            </div>
          </dl>
        </div>

        {/* Risk Factors */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Risk Factors</h3>
          <ul className="space-y-2">
            {transaction.explanations.map((explanation, index) => (
              <li key={index} className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">{explanation}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Feature Importance */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-4">Feature Importance</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={featureImportance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" domain={[0, 0.3]} tick={{ fontSize: 11 }} stroke="#6b7280" />
              <YAxis dataKey="feature" type="category" width={110} tick={{ fontSize: 10 }} stroke="#6b7280" />
              <Tooltip
                contentStyle={{ fontSize: 12, backgroundColor: 'white', border: '1px solid #e5e7eb' }}
              />
              <Bar dataKey="importance" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
