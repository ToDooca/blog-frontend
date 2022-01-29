import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Post } from "../../../common/src/@types/entity/Post";
import { Comment } from "../../../common/src/@types/entity/Comment";

@Injectable({
	providedIn: "root",
})
export class PostService {
	private baseUrl = `${environment.baseUrl}/posts`;

	constructor(private http: HttpClient) {
	}

	public getAll() {
		return this.http.get<Post[]>(`${this.baseUrl}`).toPromise();
	}

	public getById(id: number) {
		return this.http.get<Post>(`${this.baseUrl}/${id}`).toPromise();
	}

	public getBySlug(slug: string) {
		return this.http.get<Post>(`${this.baseUrl}/post/${slug}`).toPromise();
	}

	public getAllCommentsForPost(postId: number) {
		return this.http.get<Comment[]>(`${this.baseUrl}/${postId}/comments`).toPromise();
	}

	public saveCommentForPost(postId: number, comment: Comment) {
		return this.http.post<Comment>(`${this.baseUrl}/${postId}/comments`, comment).toPromise();
	}
}
