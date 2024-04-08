import { useEffect, useRef, useState, type Dispatch, type SetStateAction, type ChangeEventHandler } from "react"
import PrincipalButton from "./PrincipalButton"
import Chart from 'chart.js/auto';


interface Props {openModal: boolean, 
    setOpenModal:Dispatch<SetStateAction<boolean>>}

interface ValuesRecicly {
    plastic:number
    stacks: number,
    paper: number,
    organic: number,
}

export function StadisticModal({openModal=false, setOpenModal}:Props) { 
    const [valuesRecicly, setValuesRecicly] = useState({
        plastic: 20,
        stacks: 40,
        paper: 15,
        organic: 50,
    })
    const [data, setData] = useState([20, 40, 15, 50]);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const instanceChart = useRef<Chart<"pie", number[], string> | null>(null);

    const handleInput= (e: React.ChangeEvent<HTMLInputElement>)=>{
        const input = e.target;
        if(!(input && (input instanceof HTMLInputElement))) return;
        const value = input.value;
        const key: keyof ValuesRecicly = input.name as keyof ValuesRecicly;
        const copyValues = {...valuesRecicly};
        copyValues[key] = Number(value);
        setValuesRecicly(inicialValues => {
            copyValues[key] += inicialValues[key]
            return copyValues
        });

    } 
    const labels = ["Plástico", "pilas", "Carton/papel", "Orgánico"]
    const backgroundColors = ["#246876", "#9cc824", "#1c64ca", "#0c174b"]

    const createPie = (ctx:CanvasRenderingContext2D, data:number[], labels:string[], colors:string[])=> new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [
                {
                    label: 'Cantidad de residuos',
                    data,
                    backgroundColor: colors,
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


    useEffect(()=>{
        const dataToRender = Object.values(valuesRecicly);
        setData(dataToRender);
    
        if(instanceChart.current){
            instanceChart.current.destroy();
            instanceChart.current = null;
        }
        
    }, [valuesRecicly])

    useEffect(() => {

        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if(!ctx) return;
        if(!instanceChart.current){
            console.log(data)
            instanceChart.current = createPie(ctx, data, labels, backgroundColors)  
        }
        
  }, [data]);

    return (
    <div className={`w-full h-full fixed inset-0 bg-black bg-opacity-50 justify-center items-center ${openModal ? "flex":"hidden"}`}>
        
        <div className="w-full h-auto rounded-lg border border-gray-800 bg-gray-100 p-6 text-left">
        <div className="flex justify-between">
            <h3 className="font-bold text-2xl my-6">Añadir nueva cantidad</h3>
            <button className="top-0" onClick={()=> setOpenModal(false)} >❌</button>
        </div>

        <div className="w-full flex justify-center items-center flex-col lg:flex-row gap-6">
            <form className="w-full flex flex-col gap-3">
                <input onBlur={handleInput} type="number" name="stacks" className="w-full p-2 focus:bg-gray-200 focus:outline-none rounded-lg" placeholder="Añade la cantidad de pilas" />
                <input onBlur={handleInput} type="number" name="paper" className="w-full p-2 focus:bg-gray-200 focus:outline-none rounded-lg" placeholder="Añade la cantidad de papel/cartón" />
                <input onBlur={handleInput} type="number" name="plastic" className="w-full p-2 focus:bg-gray-200 focus:outline-none rounded-lg" placeholder="Añade la cantidad de plástico" />
                <input onBlur={handleInput} type="number" name="organic" className="w-full p-2 focus:bg-gray-200 focus:outline-none rounded-lg" placeholder="Añade la cantidad de orgánico" />
            </form>
            <div className="w-full max-w-[600px] lg:max-w-[480px] md:max-w-[300px]">
                <canvas ref={canvasRef} />
            </div>

        </div>
        <PrincipalButton> Deposito </PrincipalButton>
        </div>

    </div>
    )
}