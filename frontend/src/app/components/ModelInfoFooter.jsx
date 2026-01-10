import { modelMetrics } from '../info/existing_info';

export function ModelInfoFooter() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Model Performance & Transparency</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Model Metrics */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-4">Model Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Model Type</span>
              <span className="text-sm font-medium text-gray-900">{modelMetrics.modelType}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Precision</span>
              <span className="text-sm font-medium text-gray-900">{(modelMetrics.precision * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Recall</span>
              <span className="text-sm font-medium text-gray-900">{(modelMetrics.recall * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">AUC Score</span>
              <span className="text-sm font-medium text-gray-900">{(modelMetrics.auc * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Last Training</span>
              <span className="text-sm font-medium text-gray-900">{modelMetrics.lastTrainingDate}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">Features</span>
              <span className="text-sm font-medium text-gray-900">{modelMetrics.features}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-600">Tree Count</span>
              <span className="text-sm font-medium text-gray-900">{modelMetrics.treeCount}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
