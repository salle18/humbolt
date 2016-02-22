import {Component} from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpConfigurationTable} from "../../components/csmp-configuration-table/csmp-configuration-table.controller";
import {CsmpHeader} from "../../components/csmp-header/csmp-header.controller";

@Component({
    selector: "page-configuration-table",
    templateUrl: "pages/configuration-table/configuration-table.template.html",
    directives: [CsmpConfigurationTable, RouterLink, CsmpHeader]
})
export class ConfigurationTable {
    constructor() {
    }
}
