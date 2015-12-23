import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";

export let appServicesInjectables:Array<any> = [
	SimulationService, PlumbService, PlumbServiceUtilities
];
