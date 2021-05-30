import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LoginResponse } from "../../../common/src/@types/LoginResponse";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private baseUrl = `${environment.baseUrl}`;

	constructor(private http: HttpClient) {
	}

	public login(credentials: { username: string, password: string }) {
		return this.http.post<string>(`${this.baseUrl}/login`, credentials).toPromise();
	}

}
