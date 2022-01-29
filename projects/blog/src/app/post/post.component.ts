import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Post } from "../../../../common/src/@types/entity/Post";
import { Comment } from "../../../../common/src/@types/entity/Comment";
import { PostService } from "../../services/post.service";
import { ActivatedRoute } from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
	selector: "blog-post",
	templateUrl: "./post.component.html",
	styleUrls: ["./post.component.scss"],
	encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {
	public post: Post;
	commentList: Comment[] = [];
	commentForm = this.formBuilder.group({
		body: [null, Validators.required]
	});

	constructor(private postService: PostService, private route: ActivatedRoute, private formBuilder: FormBuilder, private toastr: ToastrService) {
	}

	ngOnInit(): void {
		const slug = this.route.snapshot.paramMap.get("slug")!;
		this.fetchPost(slug);
	}

	private async fetchPost(slug: string) {
		this.post = await this.postService.getBySlug(slug);
		this.getAllCommentsForPost()
	}

	addComment(postId: number) {
		this.postService.saveCommentForPost(postId, this.commentForm.value.body).then(() => {
			this.toastr.success("Uspešno ste postavili komentar");
		}).catch(e => {
			this.toastr.error(e);
		});
	};

	private getAllCommentsForPost() {
		this.postService.getAllCommentsForPost(this.post.id!).then(comments => {
			this.commentList = comments;
		})
	}

}
