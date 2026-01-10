import { Transaction } from '../data/mockData';

interface TransactionTableProps {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
  onSelectTransaction: (transaction: Transaction) => void;
}

export function TransactionTable({ transactions, selectedTransaction, onSelectTransaction }: TransactionTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal':
        return 'bg-green-100 text-green-800';
      case 'Review':
        return 'bg-yellow-100 text-yellow-800';
      case 'Fraud':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-red-600 font-semibold';
    if (score >= 0.5) return 'text-yellow-600 font-semibold';
    return 'text-green-600';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Merchant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr
                key={transaction.id}
                onClick={() => onSelectTransaction(transaction)}
                className={`cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedTransaction?.id === transaction.id ? 'bg-blue-50' : ''
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.timestamp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">
                  {transaction.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.merchant}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {transaction.location}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${getRiskScoreColor(transaction.riskScore)}`}>
                  {transaction.riskScore.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
