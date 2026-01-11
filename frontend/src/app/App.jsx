import { useState } from 'react';
import { KPICard } from './components/KPICard';
import { TransactionTable } from './components/TransactionTable';
import { ModelInfoFooter } from './components/ModelInfoFooter';
import { FileUpload } from './components/FileUpload';
import { ExportData } from './components/ExportData';
import { kpiData } from './info/existing_info';

export default function App() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [fileProcessed, setFileProcessed] = useState(false); // ✅ Added
  const [kpis, setKpis] = useState({
    totalTransactions: kpiData.totalTransactions,
    suspiciousTransactions: kpiData.suspiciousTransactions,
    fraudRate: kpiData.fraudRate,
    modelVersion: kpiData.modelVersion,
    threshold: kpiData.threshold,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Credit Card Fraud Detection Analytics Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Machine Learning–Based Transaction Risk Monitoring
        </p>
      </header>

      <main className="px-8 py-6 pb-12">
        {/* File Upload */}
        <FileUpload
          onKpiUpdate={(apiKpis) => {
            setKpis({
              totalTransactions: apiKpis.total_transactions,
              suspiciousTransactions: apiKpis.fraud_count,
              fraudRate: apiKpis.fraud_rate,
              modelVersion: apiKpis.model_version,
              threshold: kpis.threshold,
            });
            setFileProcessed(true); // ✅ Mark file as processed
          }}
          onTransactionsUpdate={(data) => {
            setTransactions(data);
            setFileProcessed(true); // ✅ Make sure we also mark file processed on transactions
          }}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-6">
          <KPICard
            title="Total Transactions"
            value={kpis.totalTransactions.toLocaleString()}
            subtitle="Uploaded data"
          />
          <KPICard
            title="Suspicious Transactions"
            value={kpis.suspiciousTransactions.toLocaleString()}
            subtitle="Flagged for review"
          />
          <KPICard
            title="Fraud Rate"
            value={`${kpis.fraudRate.toFixed(2)}%`}
            subtitle="Confirmed fraud cases"
          />
          <KPICard
            title="Model Version"
            value={kpis.modelVersion}
            subtitle={`Threshold: ${kpis.threshold}`}
          />
        </div>

        {/* Transaction Table */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Transactions
            </h2>
          </div>
          <TransactionTable
            transactions={transactions}
            selectedTransaction={selectedTransaction}
            onSelectTransaction={setSelectedTransaction}
          />
        </div>

        {/* Export File */}
        <div className="mb-8">
          <ExportData kpis={kpis} fileProcessed={fileProcessed} /> {/* ✅ Pass fileProcessed */}
        </div>

        <ModelInfoFooter />
      </main>

      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}
