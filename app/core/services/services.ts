import {AppService} from "./AppService";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";
import {ServerService} from "./ServerService";
import {MessageService} from "./MessageService";
import {TokenService} from "./TokenService";
import {AuthService} from "./AuthService";

export let APP_SERVICES:Array<any> = [
	AppService, SimulationService, PlumbService, PlumbServiceUtilities, ServerService, MessageService, TokenService, AuthService
];
