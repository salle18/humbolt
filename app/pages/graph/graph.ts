import { Component } from "angular2/angular2";
import {CsmpGraph} from "../../components/csmp-graph/csmp-graph.controller";

@Component({
	selector: "page-graph",
	templateUrl: "pages/graph/graph.template.html",
	directives: [CsmpGraph]
})
export class Graph {

	constructor() {
		console.log("Graph component loaded");
	}
}
