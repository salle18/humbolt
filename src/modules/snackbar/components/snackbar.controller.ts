import {Component} from "@angular/core";
import {CsmpUpgradeElement} from "../../../directives/csmp-upgrade-element";

@Component({
    selector: "snackbar",
    templateUrl: "modules/snackbar/components/snackbar.template.html",
    directives: [CsmpUpgradeElement]
})
export class Snackbar {
    constructor() {
        return;
    }
}
