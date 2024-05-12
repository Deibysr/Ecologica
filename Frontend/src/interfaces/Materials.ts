export interface Material{
    id:number,
    name:string, 
    quantity:number,
    collectionID:number
}

export interface Collection{
    materials: Material[],
    date: Date
}