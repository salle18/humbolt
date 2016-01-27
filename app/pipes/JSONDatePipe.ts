import {Pipe} from 'angular2/core';
import {DatePipe as AngularDatePipe} from "angular2/common";

@Pipe({name: 'jsondate'})
export class JSONDatePipe extends AngularDatePipe {

	transform(value:string, args:any[]):string {
		let date = new Date(value);
		return super.transform(date, args);
	}
}
