import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import {User} from "../../../common/src/@types/entity/User";

@Injectable({
	providedIn: "root",
})
export class AuthService {
	private baseUrl = `${environment.baseUrl}`;

	constructor(private http: HttpClient) {
	}

	public login(credentials: { username: string, password: string }) {
		return this.http.post<{token: string}>(`${this.baseUrl}/login`, credentials).toPromise();
	}

	public register(credentials: {fullName: string, username: string, displayName: string, password: string, email: string, about: string}){
		return this.http.post<User>(`${this.baseUrl}/users/register`, credentials).toPromise();
	}
}
