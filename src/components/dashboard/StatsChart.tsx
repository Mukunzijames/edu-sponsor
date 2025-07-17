"use client";

import React from 'react';

interface DataPoint {
  label: string;
  value: number;
  [key: string]: any;
}

interface StatsChartProps {
  data: DataPoint[];
  type?: 'bar' | 'line' | 'area';
  height?: number;
  color?: string;
  showLabels?: boolean;
  className?: string;
}

export default function StatsChart({ 
  data, 
  type = 'bar', 
  height = 200, 
  color = '#3B82F6',
  showLabels = true,
  className = ''
}: StatsChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  if (type === 'bar') {
    return (
      <div className={`w-full ${className}`} style={{ height }}>
        <div className="h-full flex items-end justify-between gap-2">
          {data.map((item, index) => {
            const barHeight = (item.value / maxValue) * 100;
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full flex items-end justify-center" style={{ height: height - 20 }}>
                  <div 
                    className="w-8 rounded-t-sm transition-all hover:opacity-80 cursor-pointer"
                    style={{ 
                      height: `${barHeight}%`, 
                      backgroundColor: color,
                      minHeight: '4px'
                    }}
                    title={`${item.label}: ${item.value}`}
                  />
                </div>
                {showLabels && (
                  <span className="text-xs text-gray-600 mt-1 text-center">{item.label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (type === 'line' || type === 'area') {
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - (item.value / maxValue) * 80; // 80% to leave some padding
      return { x, y, ...item };
    });

    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');

    const areaPath = type === 'area' 
      ? `${pathData} L ${points[points.length - 1].x} 100 L 0 100 Z`
      : '';

    return (
      <div className={`w-full ${className}`} style={{ height }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          {type === 'area' && (
            <path
              d={areaPath}
              fill={color}
              fillOpacity="0.2"
            />
          )}
          <path
            d={pathData}
            fill="none"
            stroke={color}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="3"
              fill={color}
              vectorEffect="non-scaling-stroke"
              className="cursor-pointer hover:r-4 transition-all"
            >
              <title>{`${point.label}: ${point.value}`}</title>
            </circle>
          ))}
        </svg>
        {showLabels && (
          <div className="flex justify-between mt-2">
            {data.map((item, index) => (
              <span key={index} className="text-xs text-gray-600">{item.label}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

// Example usage:
export const StatsChartExample = () => {
  const sampleData = [
    { label: 'Jan', value: 65 },
    { label: 'Feb', value: 78 },
    { label: 'Mar', value: 92 },
    { label: 'Apr', value: 110 },
    { label: 'May', value: 125 },
    { label: 'Jun', value: 140 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Bar Chart</h3>
        <StatsChart data={sampleData} type="bar" />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Line Chart</h3>
        <StatsChart data={sampleData} type="line" color="#10B981" />
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Area Chart</h3>
        <StatsChart data={sampleData} type="area" color="#F59E0B" />
      </div>
    </div>
  );
};