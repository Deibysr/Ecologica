import COLORS from "@/const/COLORS";
import MATERIALS from "@/const/MATERIALS";

function setDataEveryMonth(data: any[]){
    const monthTotals:any = {};
    for(const material of MATERIALS){
        monthTotals[material.toLowerCase()] = Array(12).fill(0)
    }

    for (let item of data) {
        let month = new Date(item.date).getMonth(); 
        for (let material of item.material) {
            monthTotals[material.name][month] += material.quantity;
        }
    }

    return monthTotals;
}

export default function processDataToYear(data:[]){
    const monthData = setDataEveryMonth(data);
    return MATERIALS.map((material, index)=>{
        const lowerMaterial = material.toLowerCase();
        return {
            data: monthData[lowerMaterial],
            label: lowerMaterial.charAt(0).toUpperCase() + lowerMaterial.slice(1),
            backgroundColor: COLORS[index],
            borderColor: COLORS[index],
            fill:false
        }
    });
}