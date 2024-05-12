import createPie from "@/helpers/createPieStats";
import { getMonthName } from "@/helpers/getMonthName";
import getDataByMonth from "@/server/Stats/getDataByMonth";
import calcMonth from "@/util/calcMonth";
import processData from "@/util/processData";
import { useEffect, useRef, useState } from "react";

export default function MonthStatsSections(){
    const refCurrentMonth = useRef<HTMLCanvasElement>(null);
    const refNextMonth = useRef<HTMLCanvasElement>(null);
    const [load, setLoad] = useState(false);

    useEffect(()=>{
        setLoad(false);
        const loadData= async ()=>{
            const currentMonth = calcMonth();
            const prevMonth = calcMonth(1);
            const dataOfMonth = await getDataByMonth(currentMonth);
            const dataOfPrevMonth = await getDataByMonth(prevMonth);
            if(!(dataOfMonth.materials && dataOfMonth.materials.length > 1)) return;
            const dataCurrentMonth = processData(dataOfMonth.materials);
            const dataPrevMonth = processData(dataOfPrevMonth.materials);
            if (!refCurrentMonth.current || !refNextMonth.current) return;
            const ctxCurrent = refCurrentMonth.current.getContext('2d');
            const ctxNext = refNextMonth.current.getContext('2d');
            if (!ctxCurrent || !ctxNext) return;
            createPie(ctxCurrent, dataCurrentMonth);
            createPie(ctxNext, dataPrevMonth);
            setLoad(true);
        }
        loadData();
    }, []);

    return(
        <section>
                <div className={`${load ? "flex" : "hidden"} w-full justify-center mt-8 flex-wrap gap-8 items-center lg:justify-between`}>
                    <div className="w-[45%] min-w-[300px] min-h-[320px]">
                        <h3 className="font-semibold text-xl text-center mb-4">Datos del mes de {getMonthName()}</h3>
                        <canvas ref={refCurrentMonth} />
                    </div>
                    <div className="w-[45%] min-w-[300px]">
                        <h3 className="font-semibold text-xl text-center mb-4">Datos del mes de {getMonthName(1)}</h3>
                        <canvas ref={refNextMonth} />
                    </div>                
                </div>
            {!load && <p>Cargando...</p>}          
        </section>
    );
};