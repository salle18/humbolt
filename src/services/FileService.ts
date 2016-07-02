import {Injectable} from "@angular/core";

@Injectable()
export class FileService {

    constructor() {
        return;
    }

    private createFileLink(data:string):string {
        var blob = new Blob([data], {type: "application/json"});
        return window.URL.createObjectURL(blob);
    }

    readFile(file:Blob):Promise<string> {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.onload = function (e:any) {
                resolve(e.target.result);
            };
            reader.readAsText(file);
        });
    }

    saveFile(data:string, filename:string):void {
        let a:any = document.createElement("a");
        let fileLink = this.createFileLink(data);
        a.href = fileLink;
        a.download = filename;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(fileLink);//prevent memory leak
    }

}
