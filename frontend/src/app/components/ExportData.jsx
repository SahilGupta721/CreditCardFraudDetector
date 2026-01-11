import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

export function ExportData({ kpis, fileProcessed, onResetFileProcessed }) {
  const [downloading, setDownloading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Showing popup only if file is uploaded & processed
    if (fileProcessed) {
      setShowPopup(true);
    } else {
      setShowPopup(false);
    }
  }, [fileProcessed]);

  const handleExport = async () => {
    try {
      setDownloading(true);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/download_prediction`);
      if (!res.ok) throw new Error('Failed to download file');

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'predicted_transactions.xlsx';
      document.body.appendChild(a);
      a.click();

      a.remove();
      window.URL.revokeObjectURL(url);

      setShowPopup(false);
      if (typeof onResetFileProcessed === 'function') {
        onResetFileProcessed(); // Reset the flag in parent after download
      }
    } catch (err) {
      console.error(err);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[340px] shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          File Ready
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Your result file is ready. Click below to download.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowPopup(false)}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
          >
            Later
          </button>
          <button
            onClick={handleExport}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md
                       hover:bg-blue-700 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {downloading ? 'Downloading...' : 'Download File'}
          </button>
        </div>
      </div>
    </div>
  );
}
