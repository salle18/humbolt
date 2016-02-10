# Humbolt client

## O projektu

Humbolt klijent je kreiran s ciljem da u jednoj aplikaciji obuhvati CSMP i GPSS simulacije. Aplikacija je napisana u [TypeScript jeziku](http://www.typescriptlang.org/) koji se [transpajlira](https://en.wikipedia.org/wiki/Source-to-source_compiler) u javascript ES5 kod.
Typescript jezik koristimo umesto običnog javascript koda kako bismo lakše definisali klase i imali strogo definisane tipove podataka.                                                                       
Aplikacija koristi [angular2](https://angular.io/) za upravljanje interfejsom a kreirana je korišćenjem [ModernWebDev yeoman generatora](https://github.com/dsebastien/modernWebDevGenerator).

Biblioteke koje koristimo u projektu:
- [material design lite](http://www.getmdl.io/) za stilizovanje interfejsa
- [jsPlumb](https://jsplumbtoolkit.com) za povezivanje elemenata konektorima
- [jquery ui](https://jqueryui.com/) za omogućavanje naprednih drag and drop funkcionalnosti
- [ace editor](https://ace.c9.io/) za prikazivanje editora za gpss
- [dypgraphs](http://dygraphs.com/) za iscrtavanje grafikona rezultata csmp simulacije

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
		+csmp-block - predstavlja jedan blok na canvas-u
		+csmp-block-list - lista blokova
		+csmp-canvas - canvas na koji se prevlače blokovi
		+csmp-configuration-table - tabela konfiguracija
		+csmp-graph - predstavljanje rezultata simulacije grafikonom
		+csmp-header - pomoćeni omotač za liniju navigacije
		+csmp-inspector - inspektor za csmp blokove
		+csmp-menu - meni za csmp
		+csmp-open-dialog - dialog koji se otvara u modalnom prozoru za otvaranje sačuvanih simulacija
		+csmp-panel - pomoćni omotač za komponente koje zauzimaju celu visinu
		+csmp-results-table - prikaz rezultata izračunvanja simulacije
		+csmp-run-dialog - dialog koji se otvara u modalnom prozoru za pokretanje simulacije
		+csmp-save-dialog - dialog koji se otvara u modalnom prozoru za čuvanje simulacije
		+gpss-menu - meni za gpss
		+gpss-open-dialog - dialog koji se otvara u modalnom prozoru za otvaranje sačuvanih simulacija
		+gpss-save-dialog - dialog koji se otvara u modalnom prozoru za čuvanje simulacije
		+humbolt-loader - dialog koji se otvara prilikom asinhronih operacija na serveru
	+core
		app.ts - glavna komponenta aplikacije, sadrži putanje svih stranica koje prikazujemo
		boot.st - pokretanje aplikacije, ovde se definišu provajderi
		services.ts - svi servisi koje aplikacija koristi moraju da se navedu u ovom fajlu
		+commons
			KeyEvent.ts - pomoćna enumeracija definiše key codes za pritisak tastera
		+services - klase servisa
			AuthService.ts - servis za autentikaciju korisnika
			CsmpAppService.ts - servis za celokupan csmp, injektuje ostale servise u sebe
			GpssAppService.ts - servis za celokupan gpss, injektuje ostale servise u sebe
			HttpService.ts - servis omotač za Http, postavlja headers za autentikaciju prilikom svakog zahteva
			MessageService.ts - servis za prikaz poruka korisniku
			PlumbService.ts - servis koji povezuje csmp sa jsPlumb bibliotekom
			PlumbServiceUtilities.ts - pomoćni servis za dodatne operacije sa jsPlumb bibliotekom
			ServerService.ts - servis koji definiše specifične serverske zahteve
			SimulationService.ts - servis koji definiše i upravlja csmp simulacijom
	+csmp
		+enums - enumeracije koje koristi csmp
			Rotation - definiše moguće položaje csmp bloka
		+interfaces - interfejsi koje koristi csmp
			IJSONBlock.ts - opisuje json reprezentaciju jednog bloka u simulaciji
			IJSONSimulation.ts - opisuje json reprezentaciju jedne simulacije
			IMetaJSONBlock.ts - opisuje meta podatke o svakom bloku
			IMetaJSONMethod.ts - opisuje json reprezentaciju mogućih metoda simulacije
			IOutput.ts - opisuje izlaze iz bloka
			IParam.ts - opisuje parametre bloka
			IPosition.ts - opisuje poziciju bloka
			ISimulationConfig.ts - opisuje konfiguraciju simulacije
		Block.ts - klasa csmp bloka
		Dictionary.ts - pomoćna klasa
		EmptyBlock.ts - prazan blok, pomoćna klasa
		Simulation.ts - klasa simulacije
	+directives - direktive za razliku od komponenti ne kreiraju novi element već dodaju funkcionalnost postojećem
		csmp-clone-block.ts - definiše direktivu koja klonira blok iz liste blokova i omogućava prevlačenje na canvas
		csmp-draggable.ts - omogućava povalačenje bloka po canvasu
		csmp-endpoints.ts - dodaje tačke za jsPlumb konektore na blok na canvasu
		csmp-interactive-block.ts - dodaje događaje miša i tastature za blok
		csmp-pannable.ts - omogućava pan canvasa povlačenjem miša
		csmp-upgrade-element.ts - dodaje material design funkcionalnosti na dinamički dodat element
		humbolt-ace-editor.ts - dodaje ace editor na zadati element
		LoggedInRouterOutlet.ts - proverava da li je korisnik ulogovan pre prikazivanja stranice
	+gpss
		+interfaces
			IGpssSimulation - opisuje json reprezentaciju gpss simulacije
	+modules
		+modal
			+components
			ModalInstance - instanca modala koja se prosleđuje kreiranoj komponenti u modalu kao i servisu odakle je pozvan modal
			ModalService - omogućava kreiranje komponente u modalnom prozoru
		+snackbar
			+components
			SnackbarService - dinamički dodaje element material design snackbar i omogućava prikazivanje poruka u tom elementu
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
+jspm_packages - jspm biblioteke se čuvaju u ovom folderu, ovaj folder se dinamički kreira i ne treba ga editovati
+node_modules - npm biblioteke se čuvaju u ovom folderu, ovaj folder se dinamički kreira i ne treba ga editovati
+typings - typescript definicije klasa se čuvaju u ovom folderu, ovaj folder se dinamički kreira i ne treba ga editovati
jspm.conf.js - fajl koji sadrži konkretne verzije biblioteka koje jspm učitava
package.json - definiše sve informacije o projektu i biblioteke koje projekat koristi
tsconfig.json
tsd.json
```
		
## Autentikacija

Za autentikaciju aplikacija koristi [JSON web tokens](https://jwt.io/) koje čuva u lokalnom skladištu brauzera (local storage).
Token se dobija prilikom logovanja a zatim se šalje prilikom svakog zahteva ka humbolt serveru.
Direktiva LoggedInRouterOutlet preusmerava korisnika na stanicu za logovanje ukoliko token ne postoji u lokalnom skladištu.
Za logout se token uklanja iz lokalnog skladišta čime se onemogućava dalje korišćenje api-ja servera.

## Humbolt server

### PUBLIC ROUTES
-`POST /login` - vraća token ako je autentikacija uspešna

#### CSMP
-`GET api/csmp/blocks` - vraća listu dostupnih blokova za simulaciju
-`GET api/csmp/integrationmethods` - vraća listu dostupnih metoda integracije

### PROTECTED ROUTES

#### CSMP
-`POST /csmp/simulate` - pokreće simulaciju, u telu zahteva očekuje IJSONSimulation objekat
-`GET /csmp/simulation` - vraća listu sačuvanih simulacija
-`GET /csmp/simulation/:id` - vraća simulaciju za zadati id
-`POST /csmp/simulation` - čuva simulaciju, u telu zahteva očekuje IJSONSimulation objekat
-`DELETE /csmp/simulation/:id` - briše simulaciju za zadati id

#### GPSS
-`POST /gpss/simulate` - pokreće simulaciju, u telu zahteva očekuje IGpssSimulation
-`GET /gpss/simulation` - vraća listu sačuvanih simulacija
-`GET /gpss/simulation/:id` - vraća simulaciju za zadati id
-`POST /gpss/simulation` - čuva simulaciju, u telu zahteva očekuje IGpssSimulation
-`DELETE /gpss/simulation/:id` - briše simulaciju za zadati id

## CSMP

Simulacioni jezik CSMP (Continuous System Modelling Program) razvijen je u IBM-u ranih 60-tih godina i predstavljao je pravi analogni simulator. To je softver namenjen modelovanju i simulaciji dinamičkih sistema u ograničenom vremenskom intervalu.
CSMP se svrstava u simulacione jezike, a zbog svog značaja izučavaju ga, predvđieno nastavnim programom, na Fakultetu Organizacionih Nauka, u okviru predmeta Simulacije i simulacioni jezici, studenti informacionog smera.

Humbolt klijent sve blokove i metode simulacije preuzima sa humbolt servera tj. klijent nije svestan nijednog bloka,
ovo omogućava da se na serveru doda novi blok ili metoda simulacije bez ikakvih promena na klijentu.

IMetaJSONBlock opisuje jedan blok.
```
export interface IMetaJSONBlock {
	className: string;
	numberOfParams: number;
	numberOfStringParams: number;
	maxNumberOfInputs: number;
	hasOutput:boolean;
	sign: string;
	description: string;
	info: string;
	paramDescription: string[];
	stringParamDescription: string[];
	isAsync: boolean;
}
```

Klasa Block je generička implementacija bloka koja učitava IMetaJSONBlock od koje se stvara jedna instanca bloka.
Klasa Simulation sadrži niz blokova i metode za dodavanje, uklanjanje, povezivanje i indeksiranje blokova.
Prilikom pokretanja simulacije iz simulacije se uzimaju samo neophodni podaci opisani u IJSONSimulation.
```
export interface IJSONSimulation {
	description: string;
	date: number;
	method: string;
	duration: number;
	integrationInterval: number;
	blocks: IJSONBlock[];
	optimizeAsync: boolean;
}
```

IJSONBlock sadrži sve neophodne informacije da bi se blok procesirao na serveru i kako bi simulacija mogla da se reprodukuje nakon čuvanja.
```
export interface IJSONBlock {
	className: string;
	position: IPosition;
	params: number[];
	stringParams: string[];
	inputs: number[];
	rotation: number;
}
```


## GPSS

Gpss klijent se sastoji od dva editora, prvi je za unos teksta simulacije a drugi za prikazivanje rezultata simulacije.
Sav sadržaj iz prvog editora se šalje humbolt serveru na obradu a celokupan odgovor se prikazuje u drugom editoru.
Omogućene su iste operacije čuvanja, otvaranja i brisanja simulacije kao i u csmp delu.
