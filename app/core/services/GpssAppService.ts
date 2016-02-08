import {Injectable} from "angular2/core";
import IEditor = AceAjax.Editor;

@Injectable()
export class GpssAppService {

	private editor:IEditor;

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
