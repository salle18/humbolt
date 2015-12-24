import {AppService} from "./AppService";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";

export let appServicesInjectables:Array<any> = [
	AppService, SimulationService, PlumbService, PlumbServiceUtilities
];
