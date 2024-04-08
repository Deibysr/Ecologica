import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface StatsDonaProps {
  data: number[];
  labels?: string[];
  backgroundColors?: string[]
  id: string,
  showLabels?: boolean;
}

const StatsDona: React.FC<StatsDonaProps> = ({
  data,
  labels = ["Plastico", "Carton/papel", "Organico", "Pilas"],
  showLabels = true,
  id,
  backgroundColors = ["#246876", "#9cc824", "#1c64ca", "#0c174b"],
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Cantidad de residuos',
                data: data,
                backgroundColor: backgroundColors,
              },
            ],
          },
          options: {
            indexAxis: 'y', 
            scales: {
              y: { beginAtZero: true, grid: { display: false } },
              x: { grid: { display: false } },
            },
          },
        });
      }
    }
  }, []);

  return (
    <div className="w-full max-w-[600px]">
      <canvas ref={canvasRef} id={id} />
    </div>
  );
};

export default StatsDona;