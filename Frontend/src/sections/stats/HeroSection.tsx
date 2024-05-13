import { useState } from "react";
import PrincipalButton from "../../components/UI/PrincipalButton.tsx";
import { StadisticModal } from "../../components/Stats/StadisticModal.tsx";
import InputUpload from "@/components/Stats/InputUpload.tsx";
import useAuth from "@/hooks/useAuth.ts";
import { Toaster } from "sonner";

export function HeroSection(){
  const {isAdmin} = useAuth();
  const [openModalIndividual, setOpenModalIndividual] = useState(false);
  const [openInputLoad, setOpenInputLoad] = useState(false);

  return(    
    <section className="py-12">
      <h1 className="text-4xl  font-bold text-balance">
        Estadísticas de <span className="bg-gradient-to-r from-ecologica-primary to-ecologica-secondary text-transparent bg-clip-text">ecológia</span>
      </h1>
      <p className="mt-5 text-base text-gray-700 px-2">
        No podemos mejorar lo que no se puede medir por eso le mostramos a la
        comunidad universitaria los <span
          className="bg-gradient-to-r from-ecologica-primary to-ecologica-secondary text-transparent bg-clip-text font-bold">datos </span> en formato estadístico para que puedan visualizar comodamente los resultados
      </p>
      {isAdmin && 
        <div className="flex justify-center items-center mt-8 mb-8">
          <PrincipalButton onClick={() => setOpenModalIndividual(true)}> Depositar mes </PrincipalButton>
          <PrincipalButton onClick={() => setOpenInputLoad(true)}> Importar Datos </PrincipalButton>
        </div>
      }

      <StadisticModal setOpenModal={setOpenModalIndividual} openModal={openModalIndividual}/>
      <InputUpload setOpenModal={setOpenInputLoad} openModal={openInputLoad}/>
      <Toaster richColors position="bottom-left" expand={true}/>
  </section>
  )
}
