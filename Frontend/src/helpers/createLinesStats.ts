import MONTHS from "@/const/MONTHS";
import { Chart } from "chart.js";

export default function createLinesStats(ctx:CanvasRenderingContext2D, data: []){
    return new Chart(ctx, {
        type: "line",
        data: {
          labels: MONTHS,
          datasets: data
        },
        options: {
          scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } },
          },
        },
      });
}