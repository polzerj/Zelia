import router from "../router";
import { login } from "../services/admin";
import Component from "../types/Component";

interface SearchElements {
    tbxUsername: HTMLInputElement;
    tbxPassword: HTMLInputElement;
    form: HTMLFormElement;
    error: HTMLDivElement;
}

export default class AdminLogin extends Component<SearchElements> {
    constructor() {
        super("zelia-admin-login", {
            useShadowRoot: true,
            queries: { tbxUsername: "#tbxUsername", tbxPassword: "#tbxPassword", form: "#frmLogin", error: "#divError" },
        });
    }

    bindMethodsCallback() {
        this.onSubmit = this.onSubmit.bind(this);
    }

    registerEventListenerCallback() {
        this.elements.form.addEventListener("submit", this.onSubmit);
    }

    removeEventListenerCallback() {
        this.elements.form.removeEventListener("submit", this.onSubmit);
    }

    private async onSubmit(e: Event) {
        e.preventDefault();

        const username = this.elements.tbxUsername.value;
        const password = this.elements.tbxPassword.value;

        let isLoggedIn = await login(username, password);

        if (isLoggedIn) {
            router.redirect("/admin/dashbord");
        } else {
            this.elements.error.textContent = "Useranme or Password wrong!";
        }
    }
}
