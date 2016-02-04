"use strict";

// import Angular 2
import {Component} from "angular2/core";

// import Angular 2 Component Router
// reference: http://blog.thoughtram.io/angular/2015/06/16/routing-in-angular-2.html
import {RouteConfig, Route, RouterLink, Router} from "angular2/router";
import {LoggedInRouterOutlet} from "../directives/LoggedInRouterOutlet";

// app components
import {Hub} from "../pages/hub/hub";
import {Login} from "../pages/login/login";
import {Csmp} from "../pages/csmp/csmp";
import {Gpss} from "../pages/gpss/gpss";
import {Graph} from "../pages/graph/graph";
import {ResultsTable} from "../pages/results-table/results-table";
import {ConfigurationTable} from "../pages/configuration-table/configuration-table";

// app services
//import {appServicesInjectables} from "core/services/services";

@Component({
	selector: "app",
	templateUrl: "core/app.template.html", //template: "<router-outlet></router-outlet>",
	directives: [LoggedInRouterOutlet, RouterLink]
})
@RouteConfig([
	{path: "/", component: Hub, as: "Hub", data: undefined},
	{path: "/login", component: Login, as: "Login", data: undefined},
	{path: "/csmp", component: Csmp, as: "Csmp", data: undefined},
	{path: "/gpss", component: Gpss, as: "Gpss", data: undefined},
	{path: "/graph", component: Graph, as: "Graph", data: undefined},
	{path: "/resultsTable", component: ResultsTable, as: "ResultsTable", data: undefined},
	{path: "/configurationTable", component: ConfigurationTable, as: "ConfigurationTable", data: undefined}
])
export class App {
	constructor() {
		console.log("Application bootstrapped!");
	}
}

