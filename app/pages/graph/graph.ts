import { Component } from "angular2/core";
import {RouterLink} from "angular2/router";
import {CsmpGraph} from "../../components/csmp-graph/csmp-graph.controller";
import {CsmpHeader} from "../../components/csmp-header/csmp-header.controller";

@Component({
	selector: "page-graph",
	templateUrl: "pages/graph/graph.template.html",
	directives: [CsmpGraph, RouterLink, CsmpHeader]
})
export class Graph {
}
