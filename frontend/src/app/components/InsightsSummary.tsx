import { UploadInsights } from './FileUpload';
import { AlertTriangle, CheckCircle, Eye } from 'lucide-react';

interface InsightsSummaryProps {
  insights: UploadInsights;
}

export function InsightsSummary({ insights }: InsightsSummaryProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Data Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Fraud Transactions</span>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-2xl font-bold text-red-600">{insights.fraudCount}</p>
          <p className="text-xs text-gray-500 mt-1">
            {insights.fraudRate.toFixed(2)}% of total
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Under Review</span>
            <Eye className="h-5 w-5 text-yellow-500" />
          </div>
          <p className="text-2xl font-bold text-yellow-600">{insights.reviewCount}</p>
          <p className="text-xs text-gray-500 mt-1">
            {((insights.reviewCount / insights.totalTransactions) * 100).toFixed(2)}% of total
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Normal Transactions</span>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">{insights.normalCount}</p>
          <p className="text-xs text-gray-500 mt-1">
            {((insights.normalCount / insights.totalTransactions) * 100).toFixed(2)}% of total
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Avg Risk Score</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{insights.avgRiskScore.toFixed(3)}</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${
                  insights.avgRiskScore >= 0.7 ? 'bg-red-500' :
                  insights.avgRiskScore >= 0.5 ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}
                style={{ width: `${insights.avgRiskScore * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {insights.highestRiskTransaction && (
        <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Highest Risk Transaction</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Transaction ID:</span>
              <p className="font-mono text-gray-900 mt-1">{insights.highestRiskTransaction.id}</p>
            </div>
            <div>
              <span className="text-gray-500">Amount:</span>
              <p className="text-gray-900 mt-1 font-semibold">${insights.highestRiskTransaction.amount.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-gray-500">Risk Score:</span>
              <p className="text-red-600 mt-1 font-bold">{(insights.highestRiskTransaction.riskScore * 100).toFixed(1)}%</p>
            </div>
            <div>
              <span className="text-gray-500">Merchant:</span>
              <p className="text-gray-900 mt-1">{insights.highestRiskTransaction.merchant}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
