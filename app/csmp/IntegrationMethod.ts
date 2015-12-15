import {Simulation} from "./Simulation";
import {Integrator} from "./ElementDefinitions";

/**
 * Klasa metode integracije. Sve metoda integracije moraju biti izvedene iz ove klase.
 */
export abstract class IntegrationMethod {
	protected simulation:Simulation = null;
	protected description:string = "";
	protected className:string = "IntegrationMethod";

	/**
	 * @param simulation Tekuća simulacija.
	 */
	constructor(simulation:Simulation) {
		this.simulation = simulation;
	}

	/**
	 * Pokretanje metode integracije.
	 */
	run():void {
		return;
	}

	/**
	 * @return Opis metode integracije.
	 */
	getDescription():string {
		return this.description;
	}

	/**
	 * @return Naziv klase metode integracije.
	 */
	getClassName():string {
		return this.className;
	}

}

/**
 * Interfejs koji sadrži element integrator, k koeficijente integracije, previous početnu vrednost integratora.
 */
interface IRungeKuttaIntegrator {
	element: Integrator;
	k: number[];
	previous: number;
}

/**
 * Generička klasa za sve Runge Kutta integracione metode. Izračunavanje se vrši na osnovu Butcherovih tabela.
 */
export abstract class RungeKutta extends IntegrationMethod {

	protected description:string = "";
	protected className:string = "RungeKutta";
	/**
	 * Butcherova metoda koja definiše metodu integracije.
	 */
	protected table:number[][] = [];

	/**
	 * Niz integratora u simulaciji.
	 */
	private integrators:IRungeKuttaIntegrator[] = [];

	/**
	 * Puni integratore iz simulacije i postavlja koeficijente i početnu vrednost na 0.
	 */
	init():void {
		let integrators = this.simulation.integrators;
		for (let i = 0; i < integrators.length; i++) {
			this.integrators.push({
				element: integrators[i],
				k: [0],
				previous: 0
			});
		}
	}

	run():void {
		/**
		 * Inicijalizuje integratore, uzima trajanje i interval integracije simulacije.
		 */
		this.init();
		let duration = this.simulation.getDuration();
		let interval = this.simulation.getIntegrationInterval();
		let timer = 0;
		/**
		 * Beleži rezultate simulacije u nultom trenutku.
		 */
		this.simulation.setResults();
		this.simulation.saveResults();

		while (timer < duration) {
			let stepInterval = 0;

			/**
			 * Za svaki integrator pamti početnu vrednost.
			 */
			for (let i = 0; i < this.integrators.length; i++) {
				let integrator = this.integrators[i];
				integrator.previous = integrator.element.result;
			}

			/**
			 * Za svaki red u Butcherovoj tabeli vrši se računanje.
			 * Prvi red se preskače.
			 */
			for (let step = 1; step < this.table.length; step++) {
				for (let i = 0; i < this.integrators.length; i++) {
					let integrator = this.integrators[i];
					/**
					 * Za svaki korak se računa novi koeficijent.
					 */
					integrator.k[step] = interval * integrator.element.getIntermediate();
					let result = integrator.previous;
					/**
					 * Novi rezultat se dobija kao suma proizvoda iz tekućeg reda Butcherove tabele i koeficijenata k.
					 */
					for (let j = 1; j < step + 1; j++) {
						result += this.table[step][j] * integrator.k[j];
					}
					integrator.element.result = result;
				}
				/**
				 * Povećava se vreme izvršavanja simulacije na osnovu prve kolone Butcherove tabele.
				 */
				this.simulation.incrementInterval(this.table[step][0] - stepInterval);
				stepInterval = this.table[step][0];
				this.simulation.setResults();
			}
			/**
			 * Nakon računanja svih redova iz tabele pamte se nove rezultati i uzima novo tekuće vreme izvršavanja.
			 */
			this.simulation.saveResults();
			timer = this.simulation.getTimer();
		}
	}
}
