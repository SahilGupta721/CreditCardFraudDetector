import { Download } from 'lucide-react';
import { utils, writeFile } from 'xlsx';

export function ExportData({ transactions, dataSource }) {
  const handleExport = () => {
    // Prepare data for Excel export
    const exportData = transactions.map(txn => ({
      'Transaction ID': txn.id,
      'Timestamp': txn.timestamp,
      'User ID': txn.userId,
      'Amount ($)': txn.amount,
      'Merchant': txn.merchant,
      'Location': txn.location,
      'Risk Score': txn.riskScore,
      'Status': txn.status,
      'Risk Explanations': txn.explanations.join('; ')
    }));

    // Create workbook and worksheet
    const ws = utils.json_to_sheet(exportData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Transactions');

    // Set column widths for better readability
    ws['!cols'] = [
      { wch: 15 }, // Transaction ID
      { wch: 20 }, // Timestamp
      { wch: 12 }, // User ID
      { wch: 12 }, // Amount
      { wch: 25 }, // Merchant
      { wch: 20 }, // Location
      { wch: 12 }, // Risk Score
      { wch: 10 }, // Status
      { wch: 60 }  // Risk Explanations
    ];

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
    const filename = `fraud_detection_${dataSource}_${timestamp}.xlsx`;

    // Download the file
    writeFile(wb, filename);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Export Transaction Data
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Download all transaction data including risk scores, classifications, and detailed explanations in Excel format (.xlsx).
          </p>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Download className="w-4 h-4" />
            Download Excel File
          </button>
        </div>
        <div className="ml-6 flex items-center justify-center w-16 h-16 bg-blue-50 rounded-lg">
          <Download className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Data Source:</span>
          <span className="font-medium text-gray-900">
            {dataSource === 'uploaded' ? 'Uploaded File' : 'Mock Data'}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-600">Total Records:</span>
          <span className="font-medium text-gray-900">{transactions.length}</span>
        </div>
      </div>
    </div>
  );
}
