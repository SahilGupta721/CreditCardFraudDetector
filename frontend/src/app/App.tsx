import { useState } from 'react';
import { KPICard } from './components/KPICard';
import { TransactionTable } from './components/TransactionTable';
import { TransactionDetail } from './components/TransactionDetail';
import { ModelInfoFooter } from './components/ModelInfoFooter';
import { FileUpload, UploadInsights } from './components/FileUpload';
import { InsightsSummary } from './components/InsightsSummary';
import { ExportData } from './components/ExportData';
import { mockTransactions, kpiData, Transaction } from './data/mockData';

export default function App() {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [uploadInsights, setUploadInsights] = useState<UploadInsights | null>(null);
  const [dataSource, setDataSource] = useState<'mock' | 'uploaded'>('mock');

  const handleDataLoaded = (uploadedTransactions: Transaction[], insights: UploadInsights) => {
    setTransactions(uploadedTransactions);
    setUploadInsights(insights);
    setDataSource('uploaded');
    setSelectedTransaction(null);
  };

  const currentKpiData = dataSource === 'uploaded' && uploadInsights ? {
    totalTransactions: uploadInsights.totalTransactions,
    suspiciousTransactions: uploadInsights.fraudCount + uploadInsights.reviewCount,
    fraudRate: uploadInsights.fraudRate,
    modelVersion: kpiData.modelVersion,
    threshold: kpiData.threshold
  } : kpiData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Fraud Detection Analytics Dashboard
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Machine Learning–Based Transaction Risk Monitoring
        </p>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6 pb-12">
        {/* File Upload Section */}
        <FileUpload onDataLoaded={handleDataLoaded} />

        {/* Upload Insights */}
        {uploadInsights && dataSource === 'uploaded' && (
          <div className="mt-6">
            <InsightsSummary insights={uploadInsights} />
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 mt-6">
          <KPICard
            title="Total Transactions"
            value={currentKpiData.totalTransactions.toLocaleString()}
            subtitle={dataSource === 'uploaded' ? 'Uploaded data' : 'Last 24 hours'}
          />
          <KPICard
            title="Suspicious Transactions"
            value={currentKpiData.suspiciousTransactions.toLocaleString()}
            subtitle="Flagged for review"
          />
          <KPICard
            title="Fraud Rate"
            value={`${currentKpiData.fraudRate.toFixed(2)}%`}
            subtitle="Confirmed fraud cases"
          />
          <KPICard
            title="Model Version"
            value={currentKpiData.modelVersion}
            subtitle={`Threshold: ${currentKpiData.threshold}`}
          />
        </div>

        {/* Transaction Table */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {dataSource === 'uploaded' ? 'Uploaded Transactions' : 'Recent Transactions'}
            </h2>
            <p className="text-sm text-gray-500">Click on a row to view details</p>
          </div>
          <TransactionTable
            transactions={transactions}
            selectedTransaction={selectedTransaction}
            onSelectTransaction={setSelectedTransaction}
          />
        </div>


        {/* Export Data Section */}
        <div className="mb-8">
          <ExportData transactions={transactions} dataSource={dataSource} />
        </div>

        {/* Model Info Footer */}
        <ModelInfoFooter />
      </main>

      {/* Transaction Detail Panel */}
      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
        />
      )}
    </div>
  );
}