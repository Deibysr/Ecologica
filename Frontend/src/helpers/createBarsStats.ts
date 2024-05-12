import MATERIALS from "@/const/MATERIALS";
import { Chart } from "chart.js";

export default function createBarsStats(ctx:CanvasRenderingContext2D, data: []){
    new Chart(ctx, {
        type: "bar",
        data: {
          labels: MATERIALS,
          datasets: [
            {
              label: "Cantidad de residuos",
              data,
              backgroundColor: ["#246876", "#9cc824", "#1c64ca", "#0c174b"],
            },
          ],
        },
        options: {
          indexAxis: "x",
          scales: {
            y: { beginAtZero: true, grid: { display: false } },
            x: { grid: { display: false } },
          },
        },
      });
}