export default function getCurrentDate(): string {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Se suma 1 porque los meses van de 0 a 11
    const year = currentDate.getFullYear().toString();
    return `${day}/${month}/${year}`;
}
