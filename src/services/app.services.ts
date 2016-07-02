import {AuthService} from './AuthService';
import {CsmpAppService} from './CsmpAppService';
import {ErrorHandler} from './ErrorHandler';
import {FileService} from './FileService';
import {GpssAppService} from './GpssAppService';
import {HttpService} from './HttpService';
import {MessageService} from './MessageService';
import {PlumbService} from './PlumbService';
import {PlumbServiceUtilities} from './PlumbServiceUtilities';
import {ServerService} from './ServerService';
import {SimulationService} from './SimulationService';
import {TokenService} from './TokenService';

export const APP_SERVICES = [
    AuthService, CsmpAppService, ErrorHandler, FileService, GpssAppService, HttpService, MessageService, PlumbService, PlumbServiceUtilities, ServerService, SimulationService, TokenService 
];