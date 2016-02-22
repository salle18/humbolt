import { Component } from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpResultsTable} from "../../components/csmp-results-table/csmp-results-table.controller";
import {CsmpHeader} from "../../components/csmp-header/csmp-header.controller";

@Component({
    selector: "page-results-table",
    templateUrl: "pages/results-table/results-table.template.html",
    directives: [CsmpResultsTable, RouterLink, CsmpHeader]
})
export class ResultsTable {
    constructor() {
        return;
    }
}
