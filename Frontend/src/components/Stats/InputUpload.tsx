import getTokenFromSession from "@/helpers/getTokenFromSession";
import sendCSVFile from "@/server/Stats/sendCSVFile";
import { type Dispatch, type SetStateAction, useCallback, useState, type FormEventHandler } from "react"
import { FileUploader } from "react-drag-drop-files";
import { Toaster, toast } from "sonner";


interface Props {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>
}

export default function InputUpload({ openModal = false, setOpenModal }: Props) {

    const [file, setFile] = useState<null | File>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit: FormEventHandler<HTMLFormElement>  = async (event)=>{
        event.preventDefault();
        if(!success || !file) throw new Error("Aún no se puede enviar");
        const formData = new FormData();
        formData.append("file", file);
        const token = getTokenFromSession();
        const resultData = await sendCSVFile(token, formData);
        if(!resultData.error){
            toast.success("Los datos se han subido correctamente");
            setTimeout(() => {
                window.location.reload();
            }, 2200);
        }else{
            toast.error(resultData.error);
            throw new Error(resultData.error);
        }
    };

    const handleChange = (file: File) => {
        setFile(file);
        setSuccess(true);
        setTimeout(() => {
            const successEl = document.querySelector(".jWkLDY");
            const spanMsg = successEl?.querySelector("span");
            if(!spanMsg) throw new Error("Error");
            spanMsg.textContent = "Archivo listo. Dale a enviar."
        }, 120);
    };

    const handleTypeError = () => {
        setSuccess(false);
        setTimeout(() => {
            const errorEl = document.querySelector(".bpxkGG");
            const spanMsg = errorEl?.querySelector("span");
            if(!spanMsg) throw new Error("Error");
            spanMsg.textContent = "El tipo del archivo no es compatible."
        }, 120);
    };

    return (
        <div className={`size-full fixed inset-0 bg-black bg-opacity-50 z-[999] justify-center items-center ${openModal ? "flex" : "hidden"}`}>

            <div className="max-w-[800px] w-full h-auto rounded-lg border border-gray-800 bg-gray-100 p-6 text-left">
                <div className="flex justify-between">
                    <h3 className="font-bold text-2xl my-6 text-center">Importar datos desde tabla</h3>
                    <button className="top-0" onClick={() => setOpenModal(false)} >❌</button>
                </div>
                <form onSubmit={handleSubmit} className="w-full scale-110 my-6 flex justify-center flex-col items-center text-lg">
                    <FileUploader
                        handleChange={handleChange}
                        name="file"
                        types={["CSV"]}
                        error
                        hoverTitle="Suelta aquí"
                        onTypeError={handleTypeError}
                        label="Arrastra tu archivo para importar datos"
                    />
                    {success && <button className="mt-2 bg-ecologica-primary text-white rounded-lg p-1 px-3 text-sm">Enviar</button>}
                </form>
            </div>
        </div>
    )
}