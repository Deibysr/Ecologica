import type { Material } from "@/interfaces/Materials";

export default function processData(allMaterials: Material[][]){
    return allMaterials.reduce((sumTotal, materials) => {
        materials.forEach((material, index) => {
            sumTotal[index] += material.quantity;
        });
        return sumTotal;
    }, Array(allMaterials[0]?.length).fill(0));
};