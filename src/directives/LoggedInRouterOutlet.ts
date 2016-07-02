import {Directive, Attribute, ElementRef, DynamicComponentLoader} from "@angular/core";
import {Router, RouterOutlet, ComponentInstruction} from "@angular/router";
import {AuthService} from "../core/services/AuthService";


@Directive({
    selector: "logged-in-router-outlet"
})
export class LoggedInRouterOutlet extends RouterOutlet {
    publicRoutes:any;
    private parentRouter:Router;
    private authService:AuthService;

    constructor(_elementRef:ElementRef, _loader:DynamicComponentLoader,
                _parentRouter:Router, @Attribute("name") nameAttr:string, authService:AuthService) {
        super(_elementRef, _loader, _parentRouter, nameAttr);

        this.authService = authService;
        this.parentRouter = _parentRouter;
        this.publicRoutes = ["/login"];
    }

    activate(instruction:ComponentInstruction) {
        var url = this.parentRouter.lastNavigationAttempt;
        if (!(this.publicRoutes.indexOf(url) > -1) && !this.authService.isLoggedIn()) {
            this.parentRouter.navigate(["Login"]);
        }
        return super.activate(instruction);
    }
}
