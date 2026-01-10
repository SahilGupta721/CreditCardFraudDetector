import { modelMetrics } from '../data/mockData';

export function ModelInfoFooter() {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8">
      <h3 className="text-sm font-medium text-gray-900 mb-4">Model Information & Performance Metrics</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
        <div>
          <dt className="text-xs text-gray-500 mb-1">Model Type</dt>
          <dd className="text-sm font-medium text-gray-900">{modelMetrics.modelType}</dd>
        </div>
        
        <div>
          <dt className="text-xs text-gray-500 mb-1">Precision</dt>
          <dd className="text-sm font-medium text-gray-900">{(modelMetrics.precision * 100).toFixed(1)}%</dd>
        </div>
        
        <div>
          <dt className="text-xs text-gray-500 mb-1">Recall</dt>
          <dd className="text-sm font-medium text-gray-900">{(modelMetrics.recall * 100).toFixed(1)}%</dd>
        </div>
        
        <div>
          <dt className="text-xs text-gray-500 mb-1">AUC-ROC</dt>
          <dd className="text-sm font-medium text-gray-900">{modelMetrics.auc.toFixed(3)}</dd>
        </div>
        
        <div>
          <dt className="text-xs text-gray-500 mb-1">Features</dt>
          <dd className="text-sm font-medium text-gray-900">{modelMetrics.features}</dd>
        </div>
        
        <div>
          <dt className="text-xs text-gray-500 mb-1">Trees</dt>
          <dd className="text-sm font-medium text-gray-900">{modelMetrics.treeCount}</dd>
        </div>
        
        <div>
          <dt className="text-xs text-gray-500 mb-1">Last Training</dt>
          <dd className="text-sm font-medium text-gray-900">{modelMetrics.lastTrainingDate}</dd>
        </div>
      </div>
    </div>
  );
}
