import { TrendingUp, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

export function InsightsSummary({ insights }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Upload Analysis Summary</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <p className="text-xs font-medium text-gray-600">Normal</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{insights.normalCount}</p>
          <p className="text-xs text-gray-500 mt-1">
            {((insights.normalCount / insights.totalTransactions) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-yellow-600" />
            <p className="text-xs font-medium text-gray-600">Review</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{insights.reviewCount}</p>
          <p className="text-xs text-gray-500 mt-1">
            {((insights.reviewCount / insights.totalTransactions) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <p className="text-xs font-medium text-gray-600">Fraud</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{insights.fraudCount}</p>
          <p className="text-xs text-gray-500 mt-1">
            {((insights.fraudCount / insights.totalTransactions) * 100).toFixed(1)}%
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-medium text-gray-600">Fraud Rate</p>
          </div>
          <p className="text-2xl font-semibold text-gray-900">{insights.fraudRate.toFixed(2)}%</p>
          <p className="text-xs text-gray-500 mt-1">Overall detection rate</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Highest Risk Transactions</h4>
        <div className="space-y-2">
          {insights.highestRisk.map((txn, index) => (
            <div key={txn.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium text-gray-500">#{index + 1}</span>
                <div>
                  <p className="text-sm font-medium text-gray-900">{txn.id}</p>
                  <p className="text-xs text-gray-600">{txn.merchant}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-red-600">{txn.riskScore.toFixed(2)}</p>
                <p className="text-xs text-gray-500">${txn.amount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
