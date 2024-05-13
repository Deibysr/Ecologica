import { Chart, PieController, CategoryScale, ArcElement, Tooltip, Legend } from 'chart.js';
import MATERIALS from "@/const/MATERIALS";
import COLORS from "@/const/COLORS";

export default function createPie(ctx: CanvasRenderingContext2D, data: number[]) {
    Chart.register(PieController, CategoryScale, ArcElement, Tooltip, Legend);

    return new Chart(ctx, {
        type: 'pie',
        data: {
            labels: MATERIALS,
            datasets: [
                {
                    label: 'Cantidad de residuos',
                    data,
                    backgroundColor: COLORS,
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