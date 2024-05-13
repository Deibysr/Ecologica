export function setOpenNavBar(btn: Element, navbar: Element){
    btn?.addEventListener("click", () => { 
            navbar?.classList.toggle("hidden");
        });
}