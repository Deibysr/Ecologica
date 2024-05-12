import { useEffect, useRef, useState, type Dispatch, type SetStateAction, type FormEventHandler } from "react"
import PrincipalButton from "../UI/PrincipalButton"
import Chart from 'chart.js/auto';
import createPie from "@/helpers/createPieStats";
import MATERIALS from "@/const/MATERIALS";
import { getMonthName } from "@/helpers/getMonthName";
import calcMonth from "@/util/calcMonth";
import getDataByMonth from "@/server/Stats/getDataByMonth";
import processData from "@/util/processData";

interface Props {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

interface ValuesRecicly {
    plastic: number
    stacks: number,
    paper: number,
    organic: number
}

export function StadisticModal({ openModal = false, setOpenModal }: Props) {
    const tempValue = useRef({} as any);
    const baseData = useRef({} as any);
    const currentData = useRef({});
    const [data, setData] = useState([]);
    const [valuesRecicly, setValuesRecicly] = useState({} as any);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const instanceChart = useRef<Chart<"pie", number[], string> | null>(null);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target;
        if (!(input && (input instanceof HTMLInputElement))) return;
        const value = input.value;
        const key: keyof ValuesRecicly = input.name as keyof ValuesRecicly;
        const copyValues = { ...valuesRecicly };
        copyValues[key] = Number(value);
        if(!value) return;
        if(tempValue.current[key] === value) return;
        // if((baseData.current[key] + valuesRecicly[key] > ))
        setValuesRecicly((inicialValues:any) => {
            console.log(copyValues)
            copyValues[key] += inicialValues[key];
            // tempValue.current[key] = value;
            // currentData.current = copyValues;
            return copyValues
        });     
    }

    const handleSubmit:FormEventHandler<HTMLFormElement> = async (e)=>{
        e.preventDefault();
    };

    useEffect(() => {
        const data = Object.values(valuesRecicly);
        setData(data as any);
        if (instanceChart.current) {
            instanceChart.current.destroy();
            instanceChart.current = null;
        }
    }, [valuesRecicly])

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        if (!instanceChart.current) {
            instanceChart.current = createPie(ctx, data)
        }
    }, [data]);

    useEffect(()=>{
        const setDataDB = async ()=>{
            if(openModal && data.length === 0){
                const currentMonth = calcMonth();
                const dataOfMonth = await getDataByMonth(currentMonth);
                if(!(dataOfMonth.materials && dataOfMonth.materials.length > 1)) return;
                const dataCurrentMonth = processData(dataOfMonth.materials);
                setData(dataCurrentMonth as any);
                baseData.current = dataCurrentMonth;
                const reciclyData = {} as any;
                MATERIALS.forEach((material, index)=> reciclyData[material.toLowerCase()] = dataCurrentMonth[index]);
                setValuesRecicly(reciclyData);
            }
        }
       setDataDB();
    }, [openModal])

    return (
        <div className={`w-full h-full z-[999] fixed inset-0 bg-black bg-opacity-50 justify-center items-center p-12 ${openModal ? "flex" : "hidden"}`}>

            <div className="w-full rounded-lg border border-gray-800 bg-gray-100 p-6 text-left">
                <div className="flex justify-between">
                    <span></span>
                    <button className="top-0" onClick={() => setOpenModal(false)} >❌</button>
                </div>

                <div className="w-full flex justify-center items-center flex-col lg:flex-row gap-6">
                    <form onSubmit={handleSubmit} className="w-full">
                        <h3 className="font-bold text-lg md:text-2xl my-6">Añadir nueva cantidad de {getMonthName()} - {new Date().getFullYear()}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {
                                MATERIALS.map(material=>(
                                    <label key={material}>
                                        {material}
                                        <input
                                            className="text-sm md:text-base p-1 py-2 rounded-lg ps-2 focus:outline-none focus:bg-gray-200" 
                                            onBlur={handleInput}
                                            type="number" 
                                            name={material.toLowerCase()} 
                                            placeholder={`Cantidad ${material}`}/>
                                    </label>
                                ))
                            }
                        </div>
                    </form>
                    <div className="w-full max-w-[250px] lg:max-w-[480px] md:max-w-[300px]">
                        <h3 className="ms-3 mb-2">Últimos datos registrados para <span className="font-bold">{getMonthName()}</span></h3>
                        <canvas ref={canvasRef} />
                    </div>

                </div>
                <PrincipalButton> Deposito </PrincipalButton>
            </div>

        </div>
    )
}