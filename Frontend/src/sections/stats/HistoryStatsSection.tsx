import createBarsStats from "@/helpers/createBarsStats";
import getAllData from "@/server/Stats/getAllData";
import processData from "@/util/processData";
import { useEffect, useRef, useState } from "react";

export default function HistoryStatsSection(){
    const refCurrentHistory = useRef<HTMLCanvasElement>(null);
    const [load, setLoad] = useState(false);

    useEffect(()=>{
        setLoad(false);
        const loadData= async ()=>{
            const {materials} = await getAllData();
            if(!(materials && materials.length > 1)) return;
            const dataConvert = processData(materials);
            if (!refCurrentHistory.current) return;
            const ctxCurrent = refCurrentHistory.current.getContext('2d');
            if (!ctxCurrent) return;
            createBarsStats(ctxCurrent, dataConvert as []);
            setTimeout(()=>{
                setLoad(true);
            }, 500)
        }
        loadData();
    }, []);


    return (
        <section className="mt-12">
            <h3 className="font-semibold text-xl text-center mb-4">Datos históricos</h3>
            <div className={`w-full ${load ? "block" : "hidden"}`}>
                <canvas ref={refCurrentHistory} />
            </div>
        </section>
    );
}