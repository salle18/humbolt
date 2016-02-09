# Humbolt client

## O projektu

Humbolt klijent je kreiran s ciljem da u jednoj aplikaciji obuhvati CSMP i GPSS simulacije. Aplikacija je napisana u [TypeScript jeziku](http://www.typescriptlang.org/) koji se [transpajlira](https://en.wikipedia.org/wiki/Source-to-source_compiler) u javascript ES5 kod.
Typescript jezik koristimo umesto običnog javascript koda kako bismo lakše definisali klase i imali strogo definisane tipove podataka.                                                                       
Aplikacija koristi [angular2](https://angular.io/) za upravljanje interfejsom a kreirana je korišćenjem [ModernWebDev yeoman generatora](https://github.com/dsebastien/modernWebDevGenerator).

Biblioteke koje koristimo u projektu:
* [material design lite](http://www.getmdl.io/) za stilizovanje interfejsa
* [jsPlumb](https://jsplumbtoolkit.com) za povezivanje elemenata konektorima
* [jquery ui](https://jqueryui.com/) za omogućavanje naprednih drag and drop funkcionalnosti
* [ace editor](https://ace.c9.io/) za prikazivanje editora za gpss
* [dypgraphs](http://dygraphs.com/) za iscrtavanje grafikona rezultata csmp simulacije

Za upravljanje bibliotekama koristimo [jspm](http://jspm.io/) i sve nove biblioteke treba uvesti korišćenjem ovog menadžera.

## Pokretanje projekta

Da biste pokrenuli projekat morate imati instaliran [node](https://nodejs.org/en/download/), a zatim i globalno instaliran [gulp](http://gulpjs.com/), to možete uraditi pokretanjem komande `npm install gulp -g` u komandnoj liniji.

Pošto za pisanje stilova koristimo sass preprocesor potrebno je instalirati [ruby](https://www.ruby-lang.org/en/downloads/) i [sass](http://sass-lang.com/install)

Zatim je potrebno instalirati zavisne biblioteke projekta pokretanjem komandi `jspm install` i `npm install` u folderu projekta.

Za više informacija možete pogledati [ModernWebDevBuild](https://github.com/dsebastien/modernWebDevBuild) projektnu dokumentaciju.

## Folderi

```
+.tmp - privremeni folder u koji se smeštaju transpajlirane verzije typescript fajlova i scss fajlova.
+app - folder koji sadrži sav kod aplikacije, ovo je jedini folder koji bi trebalo ručno menjati. U svakom folderu unutar foldera app nalazi se README.md fajl u kome se nalaze kratka uputstva o dobroj praksi i organizaciji koda.
	+components - sadrži sve angular2 komponente
		+csmp-block
		+csmp-block-list
		+csmp-canvas
		+csmp-configuration-table
		+csmp-graph
		+csmp-header
		+csmp-inspector
		+csmp-menu
		+csmp-open-dialog
		+csmp-panel
		+csmp-results-table
		+csmp-run-dialog
		+csmp-save-dialog
		+gpss-menu
		+gpss-open-dialog
		+gpss-save-dialog
		+humbolt-loader
	+core
		app.ts - glavna komponenta aplikacije, sadrži putanje svih stranica koje prikazujemo
		boot.st - pokretanje aplikacije, ovde se definišu provajderi
		services.ts - svi servisi koje aplikacija koristi moraju da se navedu u ovom fajlu
		+commons
			KeyEvent.ts
		+services - klase servisa
			AppService.ts
			AuthService.ts
			GpssAppService.ts
			HttpService.ts
			MessageService.ts
			PlumbService.ts
			PlumbServiceUtilities.ts
			ServerService.ts
			SimulationService.ts
	+csmp
		+enums - enumeracije koje koristi csmp
			Rotation
		+interfaces - interfejsi koje koristi csmp
			IJSONBlock.ts
			IJSONSimulation.ts
			IMetaJSONBlock.ts
			IMetaJSONMethod.ts
			IOutput.ts
			IParam.ts
			IPosition.ts
			ISimulationConfig.ts
		Block.ts - klasa csmp bloka
		Dictionary.ts - pomoćna klasa
		EmptyBlock.ts - prazan blok, pomoćna klasa
		Simulation.ts - klasa simulacije
	+directives - direktive za razliku od komponenti ne kreiraju novi element već dodaju funkcionalnost postojećem
		csmp-clone-block.ts
		csmp-draggable.ts
		csmp-endpoints.ts
		csmp-interactive-block.ts
		csmp-pannable.ts
		csmp-upgrade-element.ts
		humbolt-ace-editor.ts
		LoggedInRouterOutlet.ts
	+modules
		+modal
			+components
			ModalInstance
			ModalService
		+snackbar
			+components
			SnackbarService
	+pages
		+configuration-table
		+csmp
		+gpss
		+graph
		+hub
		+login
		+results-table
	+styles
		main.scss - stilovi svih komponenti, stranica i direktiva su u ovom fajlu
		vendor.sccs - sve stilove biblioteka uvozimo u ovaj fajl
+dist - folder u kome se stvara produkciona verzija aplikacije, skripte i stilovi su povezani u po jedan fajl i minifikovani.
+docs - generisana dokumentacija projekta
+jspm_packages - jspm biblioteke se čuvaju u ovom folderu
+node_modules - npm biblioteke se čuvaju u ovom folderu
+typings - typescript definicije klasa se čuvaju u ovom folderu
jspm.conf.js
package.json
tsconfig.json
tsd.json
```
		
## Autentikacija

## CSMP

Simulacioni jezik CSMP (Continuous System Modelling Program) razvijen je u IBM-u ranih 60-tih godina i predstavljao je pravi analogni simulator. To je softver namenjen modelovanju i simulaciji dinamičkih sistema u ograničenom vremenskom intervalu.
CSMP se svrstava u simulacione jezike, a zbog svog značaja izučavaju ga, predvđieno nastavnim programom, na Fakultetu Organizacionih Nauka, u okviru predmeta Simulacije i simulacioni jezici, studenti informacionog smera.

## GPSS
