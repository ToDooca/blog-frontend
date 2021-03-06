import { Injectable } from "@angular/core";
import jwtDecode from "jwt-decode";
import { CookieService } from "ngx-cookie-service";

export interface JwtToken {
	roles: string[];
	exp: number;
	iat: number;
	sub: string;
}

@Injectable({
	providedIn: "root",
})
export class JwtService {
	constructor(private cookieService: CookieService) {
	}

	public decodeToken(token: string) {
		return jwtDecode(token) as JwtToken;
	}

	public getToken(): JwtToken {
		return this.decodeToken(this.cookieService.get("token"));
	}

	public setToken(token: string): void {
		this.cookieService.set("token", token, {path: "/"});
	}

	public unsetToken() {
		this.cookieService.set("token", "", {path: "/", expires: 0});
	}

	public isLoggedIn() {
		try {
			return !!this.getToken();
		} catch (e) {
			return false;
		}
	}
}

