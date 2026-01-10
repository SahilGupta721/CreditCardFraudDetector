interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export function KPICard({ title, value, subtitle, trend }: KPICardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <h3 className="text-gray-500 text-sm mb-2">{title}</h3>
      <p className="text-3xl font-semibold text-gray-900 mb-1">{value}</p>
      {subtitle && (
        <p className="text-sm text-gray-600">{subtitle}</p>
      )}
    </div>
  );
}
