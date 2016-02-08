import {Injectable} from "angular2/core";

export interface IEditor {
	setValue(value:string):void;
	focus();
}

@Injectable()
export class GpssAppService {

	private editor:any;

	getEditor():IEditor {
		return this.editor;
	}
	
	setEditor(editor:IEditor):void {
		this.editor = editor;
	}

	reset():void {
		this.editor.setValue("");
		this.editor.focus();
	}
}
