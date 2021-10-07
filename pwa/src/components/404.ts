import Component from "../types/Component";

export default class NotFoundError extends Component<void> {
    constructor() {
        super("not-found");
    }
}
