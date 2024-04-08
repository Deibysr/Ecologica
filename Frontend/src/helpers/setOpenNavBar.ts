export function setOpenNavBar(btn: Element, navbar: Element){
    btn?.addEventListener("click", () => { console.log("hi")
            navbar?.classList.toggle("hidden");
        });
}