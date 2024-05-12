import createLinesStats from "@/helpers/createLinesStats";
import getDataByYear from "@/server/Stats/getDataByYear";
import processDataToYear from "@/util/processDataToYear";
import { useEffect, useRef, useState } from "react";

export default function YearStatsSection(){
    const refCurrentYear = useRef<HTMLCanvasElement>(null);
    const [load, setLoad] = useState(false);

    useEffect(()=>{
        setLoad(false);
        const loadData= async ()=>{
            const currentYear = new Date().getFullYear();
            const data = await getDataByYear(currentYear);
            if(!(data && data.length > 1)) return;
            const dataConvert = processDataToYear(data);

            if (!refCurrentYear.current) return;
            const ctxCurrent = refCurrentYear.current.getContext('2d');
            if (!ctxCurrent) return;
            createLinesStats(ctxCurrent, dataConvert as any);
            setTimeout(()=>{
                setLoad(true);
            }, 500)
        }
        loadData();
    }, []);

    return (
        <section className="mt-12">
            <h3 className="font-semibold text-xl text-center mb-4">Últimos datos de {new Date().getFullYear()}</h3>
            <div className={`w-full ${load ? "block" : "hidden"}`}>
                <canvas ref={refCurrentYear} />
            </div>
        </section>
    );
}