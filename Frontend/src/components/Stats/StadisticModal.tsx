import { useEffect, useRef, useState, type Dispatch, type SetStateAction, type ChangeEvent } from "react"
import PrincipalButton from "../UI/PrincipalButton"
import Chart from 'chart.js/auto';
import createPie from "@/helpers/createPieStats";
import MATERIALS from "@/const/MATERIALS";
import { getMonthName } from "@/helpers/getMonthName";
import calcMonth from "@/util/calcMonth";
import getDataByMonth from "@/server/Stats/getDataByMonth";
import processData from "@/util/processData";
import updateDataOneMonth from "@/server/Stats/updateDataOneMonth";
import getCurrentDate from "@/helpers/getCurrentDate";
import { toast } from "sonner";
import getTokenFromSession from "@/helpers/getTokenFromSession";

interface Props {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

interface ValuesRecicly {[key:string]: number}

export function StadisticModal({ openModal = false, setOpenModal }: Props) {
    const tempValue = useRef<ValuesRecicly>({});
    const baseData = useRef<ValuesRecicly>({});
    const [data, setDataStats] = useState<number[]>([]);
    const [valuesToSend, setValuesToSend] = useState<ValuesRecicly>({});
    const [valuesRender, setValuesRender] = useState<ValuesRecicly>({});
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const instanceChart = useRef<Chart<"pie", number[], string> | null>(null);

    const handleInput = (e:ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (!value || tempValue.current[name] === Number(value)) return;
        const sumValue = baseData.current[name] + Number(value);
        const updatedValues = { ...valuesRender, [name]: sumValue };
        setValuesRender(updatedValues);
        tempValue.current[name] = Number(value);
        setValuesToSend(prevObj=> ({...prevObj, [name]: Number(value)}));
    }

    const handleSubmit= async ()=>{
        const date = getCurrentDate();
        const token = getTokenFromSession();
        const resultData = await updateDataOneMonth(token, {materials:valuesToSend, date});
        if(resultData.error){
            toast.error(resultData.error);
            throw new Error(resultData.error);
        }

        toast.success(`Datos del mes de ${getMonthName()} subidos`);
        setTimeout(() => {
            window.location.reload();
        }, 2200);
    };

    useEffect(() => {
        const data = Object.values(valuesRender);
        setDataStats(data);
        if (instanceChart.current) {
            instanceChart.current.destroy();
            instanceChart.current = null;
        }
    }, [valuesRender])

    useEffect(() => {
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');
        if (!ctx) return;
        if (!instanceChart.current) {
            instanceChart.current = createPie(ctx, data)
        }
    }, [data]);

    useEffect(()=>{
        const setDataStatsDB = async ()=>{
            if(!openModal || data.length !== 0) return;
            const currentMonth = calcMonth();
            const dataOfMonth = await getDataByMonth(currentMonth);
            if(!(dataOfMonth.materials && dataOfMonth.materials.length > 0)) return;
            const dataCurrentMonth: number[] = processData(dataOfMonth.materials);
            setDataStats(dataCurrentMonth);
            const reciclyData:ValuesRecicly = {};
            const defaultValues: ValuesRecicly = {};
            MATERIALS.forEach((material, index)=> {
                const currentValue = dataCurrentMonth[index];
                const key = material.toLowerCase();
                reciclyData[key] = currentValue;
                defaultValues[key] = 0;
            });
            setValuesRender(reciclyData);
            setValuesToSend(defaultValues);
            baseData.current = reciclyData;
        }
        setDataStatsDB();
    }, [openModal])

    return (
        <div className={`w-full h-full z-[999] fixed inset-0 bg-black bg-opacity-50 justify-center items-center p-12 ${openModal ? "flex" : "hidden"}`}>
            <div className="w-full rounded-lg border border-gray-800 bg-gray-100 p-6 text-left">
                <div className="flex justify-between">
                    <span></span>
                    <button className="top-0" onClick={() => setOpenModal(false)} >❌</button>
                </div>
                <div className="w-full flex justify-center items-center flex-col lg:flex-row gap-6">
                    <form className="w-full">
                        <h3 className="font-bold text-lg md:text-2xl my-6">Añadir nueva cantidad de {getMonthName()} - {new Date().getFullYear()}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {
                                MATERIALS.map(material=>(
                                    <label key={material} className="w-full">
                                        {material}
                                        <input
                                            className="text-sm md:text-base w-full p-1 py-2 rounded-lg ps-2 focus:outline-none focus:bg-gray-200" 
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
                <PrincipalButton onClick={handleSubmit}> Deposito </PrincipalButton>
            </div>
        </div>
    )
}