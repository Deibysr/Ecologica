import COLORS from "@/const/COLORS";
import MATERIALS from "@/const/MATERIALS";
import { Chart, BarController, CategoryScale, LinearScale, BarElement } from 'chart.js';

export default function createBarsStats(ctx:CanvasRenderingContext2D, data: [], direction: "y" | "x" = "x"){
  Chart.register(BarController, CategoryScale, LinearScale, BarElement);
  console.log("Call function ", Chart)
  new Chart(ctx, {
        type: "bar",
        data: {
          labels: MATERIALS,
          datasets: [
            {
              label: "Cantidad de residuos",
              data,
              backgroundColor: COLORS
            },
          ],
        },
        options: {
          indexAxis: direction,
          scales: {
            [direction === "x" ? "y" : "x"]: {type: "linear", beginAtZero: true},
          },
        },
      });
}

