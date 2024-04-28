import { useState } from "react";
import PrincipalButton from "../../components/UI/PrincipalButton.tsx";
import { StadisticModal } from "../../components/Stats/StadisticModal.tsx";



export function HeroSection(){
  const [openModal, setOpenModal] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar la visibilidad del input
  const [selectedDate, setSelectedDate] = useState(""); // Estado para almacenar la fecha seleccionada

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    console.log(event.target.value)
  };

  return(    
    <section className="py-12">
      <h1 className="text-xl sm:text-2xl font-bold text-balance lg:text-5xl">
        Estadísticas de <span
          className="bg-gradient-to-r from-ecologica-primary to-ecologica-secondary text-transparent bg-clip-text"
          >ecológia</span
        >
      </h1>
      <p className="mt-5 text-sm lg:text-xl text-gray-700">
        No podemos mejorar lo que no se puede medir por eso le mostramos a la
        comunidad universitaria los <span
          className="bg-gradient-to-r from-ecologica-primary to-ecologica-secondary text-transparent bg-clip-text font-bold"
          >datos </span
        > en formato estadístico para que puedan visualizar comodamente los resultados
      </p>
      <div className="flex justify-center items-center mt-8 mb-8">
        <PrincipalButton onClick={() => setOpenModal(true)}> Depositar </PrincipalButton>
        <label htmlFor="date" className="ml-4 cursor-pointer text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={() => setShowDatePicker(!showDatePicker)}>
          Cambiar Fecha
        </label>
        {showDatePicker && (
          <input placeholder="qwd" type="date" onChange={handleDateChange} className="ml-2" name="date"/>
        )}
      </div>
      <StadisticModal setOpenModal={setOpenModal} openModal={openModal}/>
  </section>

  )
}
