import {AppService} from "./AppService";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";
import {ServerService} from "./ServerService";

export let APP_SERVICES:Array<any> = [
	AppService, SimulationService, PlumbService, PlumbServiceUtilities, ServerService
];
