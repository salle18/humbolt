import {CsmpAppService} from "./services/CsmpAppService";
import {SimulationService} from "./services/SimulationService";
import {PlumbService} from "./services/PlumbService";
import {PlumbServiceUtilities} from "./services/PlumbServiceUtilities";
import {ServerService} from "./services/ServerService";
import {MessageService} from "./services/MessageService";
import {AuthService} from "./services/AuthService";
import {HttpService} from "./services/HttpService";
import {SnackbarService} from "../modules/snackbar/SnackbarService";
import {GpssAppService} from "./services/GpssAppService";
import {ModalService} from "../modules/modal/ModalService";
import {FileService} from "./services/FileService";
import {ErrorHandler} from "./services/ErrorHandler";


export let APP_SERVICES:Array<any> = [
	CsmpAppService, SimulationService, PlumbService, PlumbServiceUtilities, ServerService, MessageService,
	AuthService, HttpService, SnackbarService, GpssAppService, ModalService, FileService, ErrorHandler
];
