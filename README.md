# Humbolt client

## About
Continuous System Modelling Program

This project was created using the [ModernWebDev Yeoman Generator](https://github.com/dsebastien/modernWebDevGenerator) by [dSebastien](https://twitter.com/dSebastien).

## How to build
First, make sure that you have installed the required global npm packages: `npm install gulp --global --no-optional`.

Next, you also need to install the project dependencies using `npm run setup`.

For more details about the build, refer to the [ModernWebDevBuild](https://github.com/dsebastien/modernWebDevBuild) project documentation.

## CSMP

Simulacioni jezik CSMP (Continuous System Modelling Program) razvijen je u IBM-u ranih 60-tih godina i predstavljao je pravi analogni simulator. To je softver namenjen modelovanju i simulaciji dinamičkih sistema u ograničenom vremenskom intervalu. CSMP se svrstava u simulacione jezike, a zbog svog značaja izučavaju ga, predvđieno nastavnim programom, na Fakultetu Organizacionih Nauka, u okviru predmeta Simulacije i simulacioni jezici, studenti informacionog smera.

Web CSMP je napisan u [TypeScript jeziku](http://www.typescriptlang.org/) koji se [transpajlira](https://en.wikipedia.org/wiki/Source-to-source_compiler) u javascript kod, ovaj jezik koristimo umesto običnog javascript koda kako bismo lakše definisali klase i imali strogo definisane tipove podataka.

Aplikacija koristi [angular2](https://angular.io/) za upravljanje interfejsom, [material design lite](http://www.getmdl.io/) za stilizovanje interfejsa, [jsPlumb](https://jsplumbtoolkit.com) za povezivanje elemenata konektorima i [jquery ui](https://jqueryui.com/) za omogućavanje naprednih drag and drop funkcionalnosti.