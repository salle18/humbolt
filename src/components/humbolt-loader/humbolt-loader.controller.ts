import {Component, Inject} from "@angular/core";
import {CsmpUpgradeElement} from "../../directives/csmp-upgrade-element";

@Component({
    selector: "humbolt-loader",
    templateUrl: "components/humbolt-loader/humbolt-loader.template.html",
    directives: [CsmpUpgradeElement]
})
export class HumboltLoader {
    constructor() {
        return;
    }
}
