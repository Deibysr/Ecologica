const createPopup =({container, icon, msg, status, timer}:{container:HTMLElement, icon?:string, timer?:number, msg:string, status:string})=> {
    const elementFather = document.createElement("div");
    const isError = status === "error";
    elementFather.className = "flex bg-black bg-opacity-50 justify-center items-center overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-full";
    elementFather.id = "popup";
    elementFather.innerHTML = `
        <div class="relative bg-white p-4 w-full max-w-md h-auto rounded-xl">
            <div class="flex flex-col justify-center items-center w-full h-full">
                <span class="block w-24 h-auto">
                    ${icon}
                </span>
                <h3 class="${isError ? "text-red-700" : "text-green-500"} font-bold text-lg">${isError ? "Ha habido un error" : "¡Todo ha salido correctamente!"}</h3>
                <p class="text-base text-gray-600 mt-3">${msg}</p>
            </div>
        </div>`;
    container.appendChild(elementFather);
    setTimeout(()=>{
        elementFather.remove();
    }, timer ?? 2500)
};

export default createPopup;