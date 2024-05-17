import type { FormRegisterDataUser } from "../interfaces/User";
import userRegister from "../server/User/register";
import saveSession from "../server/User/saveSession";
import createPopup from "./createPopup";

const formData: FormRegisterDataUser = {
	name: "",
	lastName: "",
	email: "",
	age: 0,
	isAdmin: 0,
	password: "",
	confirmPassword: ""
};

const realTokenSave = import.meta.env.PUBLIC_CREATE_ADMIN_TOKEN;

export default function registerScript(adminToken?: string | null) {
	const handleChange = (e: Event) => {
		const input = e.target;
		if (!(input && input instanceof HTMLInputElement)) return;
		const { name, value } = input;
		formData[name as keyof FormRegisterDataUser] = value;
	};

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		const section = document.querySelector("section");
		if (!event.target || !section) return;
		if (formData.confirmPassword !== formData.password) {
			createPopup({
				container: section,
				icon: `<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>error-filled</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="add" fill="#ff0000" transform="translate(42.666667, 42.666667)"> <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M262.250667,134.250667 L213.333333,183.168 L164.416,134.250667 L134.250667,164.416 L183.168,213.333333 L134.250667,262.250667 L164.416,292.416 L213.333333,243.498667 L262.250667,292.416 L292.416,262.250667 L243.498667,213.333333 L292.416,164.416 L262.250667,134.250667 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>`,
				msg: "La contraseña no es igual",
				status: 'error'
			})
			return;
		}
		const userData = { ...formData };
		if (adminToken === realTokenSave) {
			userData.isAdmin = 1;
		}
		userData.name = `${userData.name} ${userData.lastName}`;
		delete userData.confirmPassword;
		delete userData.lastName;
		const { user, token, error } = await userRegister(userData);
		if (error) {
			createPopup({
				container: section,
				icon: `<svg viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>error-filled</title> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="add" fill="#ff0000" transform="translate(42.666667, 42.666667)"> <path d="M213.333333,3.55271368e-14 C331.136,3.55271368e-14 426.666667,95.5306667 426.666667,213.333333 C426.666667,331.136 331.136,426.666667 213.333333,426.666667 C95.5306667,426.666667 3.55271368e-14,331.136 3.55271368e-14,213.333333 C3.55271368e-14,95.5306667 95.5306667,3.55271368e-14 213.333333,3.55271368e-14 Z M262.250667,134.250667 L213.333333,183.168 L164.416,134.250667 L134.250667,164.416 L183.168,213.333333 L134.250667,262.250667 L164.416,292.416 L213.333333,243.498667 L262.250667,292.416 L292.416,262.250667 L243.498667,213.333333 L292.416,164.416 L262.250667,134.250667 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>`,
				msg: error,
				status: 'error'
			})
			return;
		}
		saveSession({ user, token });
		window.location.href = "/";
	}

	const form = document.getElementById("register");
	const allInputs = document.querySelectorAll("input");
	allInputs.forEach(input => input.addEventListener("change", handleChange))
	form?.addEventListener("submit", handleSubmit);
}

