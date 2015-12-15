import {Element} from "./Element";
import * as Exception from "./helpers/Exception";
import {Numbers} from "./helpers/Numbers";

/**
 * Arkus tangens ulaza.
 */
export class ArcTan extends Element {
	protected sign:string = "A";
	protected description:string = "ArcTan";
	protected className:string = "ArcTan";

	constructor() {
		super(3, 1);
	}

	calculateResult():void {
		let check = this.params[0] * this.inputs[0].result + this.params[1];
		if (check > 0) {
			this.result = this.params[0] * Math.atan(check);
		} else {
			throw new Exception.Calculation("Vrednost za ArcTan je negativna.");
		}
	}
}

/**
 * Znak ulaza.
 */
export class Sign extends Element {
	protected sign:string = "B";
	protected numberOfParams:number = 0;
	protected maxNumberOfInputs:number = 1;
	protected description:string = "Sign";
	protected className:string = "Sign";

	constructor() {
		super(0, 1);
	}

	calculateResult():void {
		if (this.inputs[0].result > 0) {
			this.result = 1;
		} else if (this.inputs[0].result < 0) {
			this.result = -1;
		} else {
			this.result = 0;
		}
	}
}

/**
 * Kosinus ulaza.
 */
export class Cos extends Element {
	protected sign:string = "C";
	protected description:string = "Cos";
	protected className:string = "Cos";

	constructor() {
		super(3, 1);
	}

	calculateResult():void {
		this.result = this.params[0] * Math.cos(this.params[1] * this.inputs[0].result + this.params[2]);
	}
}

/**
 * Mrtva zona. Ako se ulaz ne nalazi između parametara vraća 0.
 */
export class DeadZone extends Element {
	protected sign:string = "D";
	protected description:string = "Mrtva zona";
	protected className:string = "DeadZone";


	constructor() {
		super(2, 1);
	}

	calculateResult():void {
		if (this.inputs[0].result > this.params[0] && this.params[0] < this.params[1]) {
			this.result = 0;
		} else {
			this.result = this.inputs[0].result;
		}
	}
}

/**
 * Eksponent ulaza.
 */
export class Exp extends Element {
	protected sign:string = "E";
	protected description:string = "Exp";
	protected className:string = "Exp";

	constructor() {
		super(3, 1);
	}

	calculateResult():void {
		this.result = this.params[0] * Math.exp(this.params[1] * this.inputs[0].result + this.params[2]);
	}
}

export class FunctionGenerator extends Element {
	protected sign:string = "F";
	protected description:string = "Generator funkcija";
	protected className:string = "FunctionGenerator";

	constructor() {
		super(2, 1);
	}

	calculateResult():void {

		throw new Exception.NotImplemented("Generator funkcija nije implementiran.");
	}
}

/**
 * Pojačanje ulaza zadatim parametrom.
 */
export class Amplify extends Element {
	protected sign:string = "G";
	protected description:string = "Pojačanje";
	protected className:string = "Amplify";

	constructor() {
		super(1, 1);
	}

	calculateResult():void {
		this.result = this.params[0] * this.inputs[0].result;
	}
}

/**
 * Kvadratni koren ulaza.
 */
export class Sqrt extends Element {
	protected sign:string = "H";
	protected description:string = "Kvadratni koren";
	protected className:string = "Sqrt";

	constructor() {
		super(0, 1);
	}

	calculateResult():void {
		if (this.inputs[0].result < 0) {
			throw new Exception.Calculation("Ulaz u kvadratni koren je negativan.");
		}
		this.result = Math.sqrt(this.inputs[0].result);
	}
}

/**
 * Rezultat integratora je uvek poznat za trenutno računanje, prvi put rezultat je iz početnog uslova,
 * svako sledeće izračunavanje se vrši za narednu vrednost integratora.
 * Intermediate vrednost predstavlja prelazni rezulata integratora prilikom računanja sledećeg rezultata integratora.
 */
export class Integrator extends Element {
	protected sign:string = "I";
	protected description:string = "Integrator";
	protected className:string = "Integrator";
	protected intermediate:number = 0;

	constructor() {
		super(3, 3);
	}

	init():void {
		this.result = this.params[0];
	}

	getIntermediate():number {
		return this.intermediate;
	}

	setIntermediate(intermediate:number):void {
		this.intermediate = intermediate;
	}

	calculateResult():void {
		this.intermediate = this.inputs[0].result + this.params[1] * this.inputs[1].result + this.params[2] * this.inputs[2].result;
	}

}

/**
 * Generator slučajnih brojeva na intervalu [0, 1).
 */
export class Randomizer extends Element {
	protected sign:string = "J";
	protected description:string = "Random generator";
	protected className:string = "Randomizer";

	constructor() {
		super(0, 0);
	}

	calculateResult():void {
		this.result = Math.random();
	}
}

/**
 * Konstanta, uvek vraća vrednost prvog parametra.
 */
export class Constant extends Element {
	protected sign:string = "K";
	protected description:string = "Konstanta";
	protected className:string = "Constant";

	constructor() {
		super(1, 0);
	}

	init():void {
		this.result = this.params[0];
	}
}

/**
 * Ograničavač vraća ulaz ukoliko je ulaz između donjeg i gornjeg parametra, a donji i gornji parametar inače.
 */
export class Limiter extends Element {
	protected sign:string = "L";
	protected description:string = "Ograničavač";
	protected className:string = "Limiter";

	constructor() {
		super(2, 1);
	}

	calculateResult():void {
		if (this.inputs[0].result < this.params[0]) {
			this.result = this.params[0];
		} else if (this.inputs[0].result > this.params[1]) {
			this.result = this.params[1];
		} else {
			this.result = this.inputs[0].result;
		}
	}
}

/**
 * Apsolutna vrednost ulaza.
 */
export class Abs extends Element {
	protected sign:string = "M";
	protected description:string = "Apsolutna vrednost";
	protected className:string = "Abs";

	constructor() {
		super(0, 1);
	}

	calculateResult():void {
		this.result = Math.abs(this.inputs[0].result);
	}
}

/**
 * Negativni ograničavač vraća ulaz ukoliko je veći od nule, a nulu inače.
 */
export class NegativeLimiter extends Element {
	protected sign:string = "N";
	protected description:string = "Negativni ograničavač";
	protected className:string = "NegativeLimiter";

	constructor() {
		super(0, 1);
	}

	calculateResult():void {
		if (this.inputs[0].result < 0) {
			this.result = 0;
		} else {
			this.result = this.inputs[0].result;
		}
	}
}

/**
 * Offset dodaje parametar na ulaz.
 */
export class Offset extends Element {
	protected sign:string = "O";
	protected description:string = "Offset";
	protected className:string = "Offset";

	constructor() {
		super(1, 1);
	}

	calculateResult():void {
		this.result = this.inputs[0].result + this.params[0];
	}
}

/**
 * Pozitivni ograničavač vraća ulaz ukoliko je manji od nule, a nulu inače.
 */
export class PositiveLimiter extends Element {
	protected sign:string = "P";
	protected description:string = "Pozitivni ograničavač";
	protected className:string = "PositiveLimiter";

	constructor() {
		super(0, 1);
	}

	calculateResult():void {
		if (this.inputs[0].result > 0) {
			this.result = 0;
		} else {
			this.result = this.inputs[0].result;
		}
	}
}

/**
 * Prekida izvršavanje simulacije.
 */
export class Quit extends Element {
	protected sign:string = "Q";
	protected description:string = "Quit";
	protected className:string = "Quit";
	protected hasOutput:boolean = false;

	constructor() {
		super(0, 1);
	}

	calculateResult():void {
		throw new Exception.QuitSimulation("Simulacija završena.");
	}
}

/**
 * Vraća drugi ili treći ulaz zavisno da li je prvi ulaz veći od nule.
 */
export class Relay extends Element {
	protected sign:string = "R";
	protected description:string = "Relej";
	protected className:string = "Relay";

	constructor() {
		super(0, 3);
	}

	calculateResult():void {
		if (this.inputs[0].result < 0) {
			this.result = this.inputs[2].result;
		} else {
			this.result = this.inputs[1].result;
		}
	}
}

/**
 * Sinus ulaza.
 */
export class Sin extends Element {
	protected sign:string = "S";
	protected description:string = "Sin";
	protected className:string = "Sin";

	constructor() {
		super(3, 1);
	}

	calculateResult():void {
		this.result = this.params[0] * Math.sin(this.params[1] * this.inputs[0].result + this.params[2]);
	}
}

/**
 * Generator impulsa. Generiše povorku impulsa od trenutka kada je ulaz veći od nule.
 */
export class ImpulseGenerator extends Element {
	protected sign:string = "T";
	protected description:string = "Generator impulsa";
	protected className:string = "ImpulseGenerator";
	private generate:boolean = false;
	private interval:number = 0;
	private startInterval:number = 0;

	constructor() {
		super(1, 1);
	}

	init() {
		this.result = 0;
		this.interval = this.params[0];
		this.startInterval = 0;
		if (!Numbers.divideable(this.interval, this.simulation.getIntegrationInterval())) {
			throw new Exception.Calculation("Interval generatora impulsa treba da bude umnožak intervala integracije.");
		}
	}

	calculateResult():void {
		if (this.generate) {
			if (Numbers.divideable(this.simulation.getTimer() - this.startInterval, this.interval)) {
				this.result = 1;
			} else {
				this.result = 0;
			}
		} else if (this.inputs[0].result > 0) {
			this.generate = true;
			this.startInterval = this.simulation.getTimer();
			this.calculateResult();
		}
	}
}

/**
 * Jedinično kašnjenje vraća rezulata iz prethodnog ciklusa izračunavanja.
 */
export class UnitDelay extends Element {
	protected sign:string = "U";
	protected description:string = "Jedinično kašnjenje";
	protected className:string = "UnitDelay";

	constructor() {
		super(1, 1);
	}

	init():void {
		this.memory = this.params[0];
	}

	calculateResult():void {
		this.result = this.memory;
		this.memory = this.inputs[0].result;
	}
}

export class Vacuous extends Element {
	protected sign:string = "V";
	protected description:string = "Vacuous";
	protected className:string = "Vacuous";

	constructor() {
		super(1, 0);
	}

	calculateResult():void {
		throw new Exception.NotImplemented("Vacuous nije implementirano.");
	}
}

export class Wye extends Element {
	protected sign:string = "W";
	protected description:string = "Wye";
	protected className:string = "Wye";

	constructor() {
		super(2, 2);
	}

	calculateResult():void {
		throw new Exception.NotImplemented("Wye element nije implementiran.");
	}
}

/**
 * Ukoliko je ulaz manji od nule vraća 0, ukoliko je veći od 0 vraća ulaz i pamti vrednost,
 * a ukoliko je nula vraća zapamćenu vrednost.
 */
export class CircuitDelay extends Element {
	protected sign:string = "Z";
	protected description:string = "Kolo zadrške";
	protected className:string = "CircuitDelay";

	constructor() {
		super(0, 2);
	}

	calculateResult():void {
		if (this.inputs[1].result < 0) {
			this.result = 0;
		} else if (this.inputs[1].result > 0) {
			this.result = this.memory = this.inputs[0].result;
		} else {
			this.result = this.memory;
		}
	}
}

/**
 * Vraća tekuće vreme simulacije.
 */
export class Time extends Element {
	protected sign:string = "t";
	protected numberOfParams:number = 0;
	protected maxNumberOfInputs:number = 0;
	protected description:string = "Vreme";
	protected className:string = "Time";

	constructor() {
		super(0, 0);
	}

	calculateResult():void {
		this.result = this.simulation.getTimer();
	}
}

/**
 * Sabira ulazne elemente i množi ih sa respektivinim parametrima.
 */
export class Add extends Element {
	protected sign:string = "+";
	protected description:string = "Sabirač";
	protected className:string = "Add";

	constructor() {
		super(3, 3);
	}

	calculateResult():void {
		this.result = this.params[0] * this.inputs[0].result + this.params[1] * this.inputs[1].result + this.params[2] * this.inputs[2].result;
	}
}

/**
 * Invertuje znak ulaza.
 */
export class Invert extends Element {
	protected sign:string = "-";
	protected description:string = "Invertor";
	protected className:string = "Invert";

	constructor() {
		super(0, 1);
	}

	calculateResult():void {
		this.result = -this.inputs[0].result;
	}
}

/**
 * Množi ulaze.
 */
export class Multiply extends Element {
	protected sign:string = "*";
	protected description:string = "Množač";
	protected className:string = "Multiply";

	constructor() {
		super(0, 2);
	}

	calculateResult():void {
		this.result = this.inputs[0].result * this.inputs[1].result;
	}
}

/**
 * Deli ulaze.
 */
export class Divide extends Element {
	protected sign:string = "/";
	protected description:string = "Delitelj";
	protected className:string = "Divide";

	constructor() {
		super(0, 2);
	}

	calculateResult():void {
		if (this.inputs[1].result === 0) {
			throw new Exception.DivideByZero("Divider nedozvoljeno deljenje nulom.");
		}
		this.result = this.inputs[0].result / this.inputs[1].result;
	}
}

/**
 * Internet of things računa rezultat na serveru i vraća odgovor nakon toga.
 */
export class IoT extends Element {
	protected sign:string = "IoT";
	protected description:string = "Internet of Things";
	protected className:string = "IoT";
	protected stringParams:string[] = [""];
	public remote = true;

	constructor() {
		super(0, 3);
	}

	init():void {
		return;
	}
}
