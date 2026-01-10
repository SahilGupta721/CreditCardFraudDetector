import { useState, useCallback } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';
import { Transaction } from '../data/mockData';

interface FileUploadProps {
  onDataLoaded: (transactions: Transaction[], insights: UploadInsights) => void;
}

export interface UploadInsights {
  totalTransactions: number;
  fraudCount: number;
  reviewCount: number;
  normalCount: number;
  fraudRate: number;
  highestRiskTransaction: Transaction | null;
  avgRiskScore: number;
}

export function FileUpload({ onDataLoaded }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeTransactions = (transactions: Transaction[]): UploadInsights => {
    const fraudCount = transactions.filter(t => t.status === 'Fraud').length;
    const reviewCount = transactions.filter(t => t.status === 'Review').length;
    const normalCount = transactions.filter(t => t.status === 'Normal').length;
    const fraudRate = (fraudCount / transactions.length) * 100;
    const avgRiskScore = transactions.reduce((sum, t) => sum + t.riskScore, 0) / transactions.length;
    const highestRiskTransaction = transactions.reduce((max, t) => 
      t.riskScore > (max?.riskScore || 0) ? t : max
    , null as Transaction | null);

    return {
      totalTransactions: transactions.length,
      fraudCount,
      reviewCount,
      normalCount,
      fraudRate,
      highestRiskTransaction,
      avgRiskScore
    };
  };

  const processFile = useCallback((file: File) => {
    setError(null);
    setUploadedFile(file);

    // Check file type
    if (!file.name.endsWith('.csv') && !file.name.endsWith('.json')) {
      setError('Please upload a CSV or JSON file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let parsedTransactions: Transaction[] = [];

        if (file.name.endsWith('.csv')) {
          // Parse CSV file
          Papa.parse(content, {
            header: true,
            complete: (results) => {
              parsedTransactions = results.data
                .filter((row: any) => row.id) // Filter out empty rows
                .map((row: any, index: number) => {
                  // Determine status based on risk score
                  const riskScore = parseFloat(row.riskScore || row.risk_score || 0);
                  let status: 'Normal' | 'Review' | 'Fraud' = 'Normal';
                  if (riskScore >= 0.7) status = 'Fraud';
                  else if (riskScore >= 0.5) status = 'Review';

                  return {
                    id: row.id || `TXN-${String(index + 1).padStart(3, '0')}`,
                    timestamp: row.timestamp || new Date().toISOString(),
                    userId: row.userId || row.user_id || `USR-${Math.floor(Math.random() * 100000)}`,
                    amount: parseFloat(row.amount || 0),
                    merchant: row.merchant || 'Unknown Merchant',
                    location: row.location || 'Unknown Location',
                    riskScore: riskScore,
                    status: row.status || status,
                    explanations: row.explanations 
                      ? row.explanations.split('|') 
                      : ['Automated risk assessment']
                  } as Transaction;
                });

              const insights = analyzeTransactions(parsedTransactions);
              onDataLoaded(parsedTransactions, insights);
            },
            error: (error) => {
              setError(`CSV parsing error: ${error.message}`);
            }
          });
        } else {
          // Parse JSON file
          const jsonData = JSON.parse(content);
          const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
          
          parsedTransactions = dataArray.map((row: any, index: number) => {
            const riskScore = parseFloat(row.riskScore || row.risk_score || 0);
            let status: 'Normal' | 'Review' | 'Fraud' = 'Normal';
            if (riskScore >= 0.7) status = 'Fraud';
            else if (riskScore >= 0.5) status = 'Review';

            return {
              id: row.id || `TXN-${String(index + 1).padStart(3, '0')}`,
              timestamp: row.timestamp || new Date().toISOString(),
              userId: row.userId || row.user_id || `USR-${Math.floor(Math.random() * 100000)}`,
              amount: parseFloat(row.amount || 0),
              merchant: row.merchant || 'Unknown Merchant',
              location: row.location || 'Unknown Location',
              riskScore: riskScore,
              status: row.status || status,
              explanations: Array.isArray(row.explanations) 
                ? row.explanations 
                : ['Automated risk assessment']
            } as Transaction;
          });

          const insights = analyzeTransactions(parsedTransactions);
          onDataLoaded(parsedTransactions, insights);
        }
      } catch (err) {
        setError(`Error parsing file: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    };

    reader.onerror = () => {
      setError('Error reading file');
    };

    reader.readAsText(file);
  }, [onDataLoaded]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleClear = useCallback(() => {
    setUploadedFile(null);
    setError(null);
  }, []);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Transaction Data</h2>
      
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop your transaction file here, or
        </p>
        <label className="inline-block">
          <span className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors">
            Browse Files
          </span>
          <input
            type="file"
            accept=".csv,.json"
            onChange={handleFileInput}
            className="hidden"
          />
        </label>
        <p className="text-xs text-gray-500 mt-4">
          Supported formats: CSV, JSON
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Required fields: id, timestamp, userId, amount, merchant, location, riskScore
        </p>
      </div>

      {uploadedFile && !error && (
        <div className="mt-4 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-green-900">{uploadedFile.name}</p>
              <p className="text-xs text-green-600">
                {(uploadedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button
            onClick={handleClear}
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="mt-4 flex items-start bg-red-50 border border-red-200 rounded-lg p-4">
          <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">Error</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
          <button
            onClick={handleClear}
            className="text-red-600 hover:text-red-800 transition-colors ml-2"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
