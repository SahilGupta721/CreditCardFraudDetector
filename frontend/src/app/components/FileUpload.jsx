import { useState, useRef } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';

export function FileUpload({ onKpiUpdate, onTransactionsUpdate }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const uploadFile = async (file) => {
    setError(null);
    setIsProcessing(true);
    // Check file size (max 90MB)
    const MAX_SIZE = 90 * 1024 * 1024; // 90 MB in bytes
    if (file.size > MAX_SIZE) {
      setError('File size exceeds 90 MB limit.');
      setIsProcessing(false);
      return;
    }
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls'].includes(ext)) {
      setError('Only Excel files (.xlsx, .xls) are supported.');
      setIsProcessing(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/file_prediction`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Backend processing failed');
      }

      const data = await res.json();
      console.log('API Response:', data);

      // 🔑 Update KPIs in parent if function exists
      if (typeof onKpiUpdate === 'function' && data.kpis) {
        onKpiUpdate(data.kpis);
      }
      if (typeof onTransactionsUpdate === 'function') {
        onTransactionsUpdate(data.results || data.transactions || []);
      }



    } catch (err) {
      setError(err.message || 'Something went wrong while uploading.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      uploadFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upload Transaction Data
      </h3>

      <div
        onDragEnter={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer ${isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:bg-gray-50'
          }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileSelect}
          className="hidden"
        />

        {isProcessing ? (
          <p className="text-sm text-gray-600">Processing file...</p>
        ) : (
          <>
            <Upload className="w-12 h-12 text-gray-400 mb-4 mx-auto" />
            <p className="text-sm font-medium text-gray-900">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500">Excel files only (.xlsx, .xls)</p>
          </>
        )}
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
        <FileText className="w-5 h-5 text-blue-600" />
        <p className="text-xs text-blue-700">
          Upload an Excel file with transaction features (Time, V1–V28, Amount).
        </p>
      </div>
    </div>
  );
}
