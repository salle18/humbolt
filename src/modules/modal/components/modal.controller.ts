import {Component} from "@angular/core";

@Component({
    selector: "dialog",
    templateUrl: "modules/modal/components/modal.template.html",
    host: {
        class: "mdl-dialog"
    }
})
export class Modal {
    constructor() {
        return;
    }
}
