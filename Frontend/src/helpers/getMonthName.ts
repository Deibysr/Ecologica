export function getMonthName(number:number = 0) {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesActual = new Date().getMonth();
    return meses[mesActual - number];
}