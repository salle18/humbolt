import {Injectable} from "angular2/core";

@Injectable()
export class FileService {

	private fileLink:string = null;

	createFileLink(data:string):string {

		var blob = new Blob([data], {type: "application/json"});
		if (this.fileLink !== null) {
			window.URL.revokeObjectURL(this.fileLink);//prevent memory leak
		}
		this.fileLink = window.URL.createObjectURL(blob);
		return this.fileLink;
	}

}
