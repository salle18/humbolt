import {Component} from "@angular/core";

@Component({
    selector: "humbolt-message-box",
    templateUrl: "components/humbolt-message-box/humbolt-message-box.template.html",
    host: {
        class: "mdl-shadow--2dp"
    }
})
export class HumboltMessageBox {
    constructor() {
        return;
    }
}
