import {AppService} from "./AppService";
import {SimulationService} from "./SimulationService";
import {PlumbService} from "./PlumbService";
import {PlumbServiceUtilities} from "./PlumbServiceUtilities";
import {ServerService} from "./ServerService";
import {MessageService} from "./MessageService";
import {AuthService} from "./AuthService";
import {HttpService} from "./HttpService";
import {SnackbarService} from "../../modules/snackbar/SnackbarService";
import {GpssAppService} from "./GpssAppService";
import {ModalService} from "../../modules/modal/ModalService";


export let APP_SERVICES:Array<any> = [
	AppService, SimulationService, PlumbService, PlumbServiceUtilities, ServerService, MessageService,
	AuthService, HttpService, SnackbarService, GpssAppService, ModalService
];
