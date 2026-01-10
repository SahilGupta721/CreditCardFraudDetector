export interface Transaction {
  id: string;
  timestamp: string;
  userId: string;
  amount: number;
  merchant: string;
  location: string;
  riskScore: number;
  status: 'Normal' | 'Review' | 'Fraud';
  explanations: string[];
}

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    timestamp: '2026-01-03 14:23:45',
    userId: 'USR-48291',
    amount: 4850.00,
    merchant: 'Electronics World',
    location: 'New York, NY',
    riskScore: 0.89,
    status: 'Fraud',
    explanations: [
      'High transaction amount compared to user history',
      'Unusual transaction time',
      'New merchant not seen before'
    ]
  },
  {
    id: 'TXN-002',
    timestamp: '2026-01-03 14:18:12',
    userId: 'USR-19384',
    amount: 42.50,
    merchant: 'Starbucks Coffee',
    location: 'Seattle, WA',
    riskScore: 0.12,
    status: 'Normal',
    explanations: [
      'Consistent with user spending patterns',
      'Familiar merchant'
    ]
  },
  {
    id: 'TXN-003',
    timestamp: '2026-01-03 14:15:33',
    userId: 'USR-77523',
    amount: 1250.00,
    merchant: 'Online Gaming Store',
    location: 'Austin, TX',
    riskScore: 0.67,
    status: 'Review',
    explanations: [
      'Higher than average transaction amount',
      'New merchant category for user',
      'Transaction during unusual hours'
    ]
  },
  {
    id: 'TXN-004',
    timestamp: '2026-01-03 14:12:56',
    userId: 'USR-33901',
    amount: 89.99,
    merchant: 'Amazon',
    location: 'Chicago, IL',
    riskScore: 0.08,
    status: 'Normal',
    explanations: [
      'Regular merchant',
      'Amount within normal range'
    ]
  },
  {
    id: 'TXN-005',
    timestamp: '2026-01-03 14:08:22',
    userId: 'USR-55612',
    amount: 3200.00,
    merchant: 'Luxury Watches Inc',
    location: 'Miami, FL',
    riskScore: 0.92,
    status: 'Fraud',
    explanations: [
      'Extremely high amount for user profile',
      'First transaction with luxury goods',
      'Geographic anomaly detected'
    ]
  },
  {
    id: 'TXN-006',
    timestamp: '2026-01-03 14:05:41',
    userId: 'USR-42188',
    amount: 156.30,
    merchant: 'Whole Foods Market',
    location: 'San Francisco, CA',
    riskScore: 0.15,
    status: 'Normal',
    explanations: [
      'Typical grocery spending',
      'Known merchant location'
    ]
  },
  {
    id: 'TXN-007',
    timestamp: '2026-01-03 13:58:14',
    userId: 'USR-60945',
    amount: 875.00,
    merchant: 'International Wire Transfer',
    location: 'Boston, MA',
    riskScore: 0.71,
    status: 'Review',
    explanations: [
      'Unusual transaction type',
      'First international transfer',
      'Amount exceeds typical range'
    ]
  },
  {
    id: 'TXN-008',
    timestamp: '2026-01-03 13:52:37',
    userId: 'USR-29103',
    amount: 52.75,
    merchant: 'Shell Gas Station',
    location: 'Denver, CO',
    riskScore: 0.09,
    status: 'Normal',
    explanations: [
      'Regular gas purchase pattern',
      'Consistent location'
    ]
  },
  {
    id: 'TXN-009',
    timestamp: '2026-01-03 13:47:29',
    userId: 'USR-81234',
    amount: 2100.00,
    merchant: 'Crypto Exchange Platform',
    location: 'Los Angeles, CA',
    riskScore: 0.78,
    status: 'Review',
    explanations: [
      'High-risk merchant category',
      'Large amount for first crypto transaction',
      'Velocity check triggered'
    ]
  },
  {
    id: 'TXN-010',
    timestamp: '2026-01-03 13:42:08',
    userId: 'USR-14567',
    amount: 28.50,
    merchant: 'McDonald\'s',
    location: 'Houston, TX',
    riskScore: 0.05,
    status: 'Normal',
    explanations: [
      'Low-risk fast food transaction',
      'Normal spending pattern'
    ]
  },
  {
    id: 'TXN-011',
    timestamp: '2026-01-03 13:35:51',
    userId: 'USR-92341',
    amount: 5500.00,
    merchant: 'Overseas Electronics',
    location: 'Phoenix, AZ',
    riskScore: 0.94,
    status: 'Fraud',
    explanations: [
      'Extremely high transaction amount',
      'Merchant flagged in fraud database',
      'Multiple risk factors present'
    ]
  },
  {
    id: 'TXN-012',
    timestamp: '2026-01-03 13:28:19',
    userId: 'USR-37829',
    amount: 118.40,
    merchant: 'Target',
    location: 'Portland, OR',
    riskScore: 0.11,
    status: 'Normal',
    explanations: [
      'Typical retail purchase',
      'Regular merchant'
    ]
  }
];

export const kpiData = {
  totalTransactions: 12458,
  suspiciousTransactions: 234,
  fraudRate: 1.88,
  modelVersion: 'v2.4.1',
  threshold: 0.65
};

export const hourlyFraudData = [
  { hour: '00:00', fraudRate: 3.2 },
  { hour: '02:00', fraudRate: 4.1 },
  { hour: '04:00', fraudRate: 2.8 },
  { hour: '06:00', fraudRate: 1.5 },
  { hour: '08:00', fraudRate: 1.2 },
  { hour: '10:00', fraudRate: 1.4 },
  { hour: '12:00', fraudRate: 1.8 },
  { hour: '14:00', fraudRate: 2.1 },
  { hour: '16:00', fraudRate: 2.5 },
  { hour: '18:00', fraudRate: 2.8 },
  { hour: '20:00', fraudRate: 3.5 },
  { hour: '22:00', fraudRate: 3.9 }
];

export const transactionStatusData = [
  { name: 'Normal', count: 11950 },
  { name: 'Review', count: 234 },
  { name: 'Fraud', count: 274 }
];

export const amountDistributionData = [
  { range: '$0-50', count: 6200 },
  { range: '$50-200', count: 3800 },
  { range: '$200-500', count: 1450 },
  { range: '$500-1000', count: 680 },
  { range: '$1000-2000', count: 220 },
  { range: '$2000+', count: 108 }
];

export const highRiskMerchants = [
  { merchant: 'Overseas Electronics', riskScore: 0.94 },
  { merchant: 'Luxury Watches Inc', riskScore: 0.92 },
  { merchant: 'Electronics World', riskScore: 0.89 },
  { merchant: 'Crypto Exchange Platform', riskScore: 0.78 },
  { merchant: 'International Wire Transfer', riskScore: 0.71 }
];

export const modelMetrics = {
  modelType: 'Random Forest Classifier',
  precision: 0.94,
  recall: 0.89,
  auc: 0.96,
  lastTrainingDate: '2025-12-28',
  features: 47,
  treeCount: 500
};

export const featureImportance = [
  { feature: 'Transaction Amount', importance: 0.28 },
  { feature: 'Time of Day', importance: 0.19 },
  { feature: 'Merchant Category', importance: 0.15 },
  { feature: 'Geographic Distance', importance: 0.13 },
  { feature: 'Velocity Check', importance: 0.11 },
  { feature: 'User History', importance: 0.09 },
  { feature: 'Device Fingerprint', importance: 0.05 }
];
