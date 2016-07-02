import {Injectable} from "@angular/core";

@Injectable()
export class ErrorHandler {

    constructor() {
        return;
    }

    handle(error:any):string {
        if (error) {
            if (typeof error === "string") {
                return error;
            }
            if (error._body) {
                try {
                    console.log("PARSING");
                    error = JSON.parse(error._body);
                } catch (e) {
                    return this.unknownError(error);
                }
            }
            if (error.message) {
                return error.message;
            }
            if (error.error) {
                return error.error;
            }
            return this.unknownError(error);
        }
        return this.unknownError(error);
    }


    private unknownError(error:any):string {
        console.error(error);
        return "Unknown error, see console for more information.";
    }

}
