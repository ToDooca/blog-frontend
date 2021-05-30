import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {LoginFormComponent} from "./login-form/login-form.component";

const routes: Routes = [
	{
		path: "register",
		component: RegisterFormComponent,
	},
	{
		path: "**",
		component: LoginFormComponent,
	},
	{
		path: "admin",
		redirectTo: "/admin"
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class LoginRoutingModule {
}
