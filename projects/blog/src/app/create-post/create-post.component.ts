import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Post} from "../../../../common/src/@types/entity/Post";
import {User} from "../../../../common/src/@types/entity/User";
import {Category} from "../../../../common/src/@types/entity/Category";
import {FormBuilder, Validators} from "@angular/forms";
import {PostService} from "../../../../admin/src/services/post.service";
import {CategoryService} from "../../../../admin/src/services/category.service";
import {ToastrService} from "ngx-toastr";
import {UserInfoService} from "../../../../common/src/services/user-info.service";
import {ActivatedRoute} from "@angular/router";
import * as M from "materialize-css";
import {environment} from "../../../../login/src/environments/environment";

@Component({
    selector: 'blog-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CreatePostComponent implements OnInit {
    private post: Post;
    private user: User;
    public categories: Category[] = [];
    public category?: Category;
    public postForm = this.fb.group({
        title: [null, Validators.required],
        slug: [null, Validators.required],
        excerpt: [null, Validators.required],
        category: [null, Validators.required],
        body: [null, Validators.required],
    });
    public postBody: string = "";

    constructor(private fb: FormBuilder,
                private postService: PostService,
                private categoryService: CategoryService,
                private userInfoService: UserInfoService,
                private toastService: ToastrService) {
    }

    ngOnInit(): void {
        (async () => {
            M.updateTextFields();
            this.user = await this.userInfoService.getLoggedInUser();
            this.categories = await this.categoryService.getAll();
            setTimeout(() => this.updateCategoryInput(), 10);
        })();
    }


    onSubmit() {
        const post: Post = {
            id: this.post ? this.post.id : 0,
            body: this.postForm.get("body")?.value,
            category: this.categories.find(categ => categ.id == this.postForm.get("category")?.value!)!,
            user: this.user,
            excerpt: this.postForm.get("excerpt")?.value,
            published: true,
            slug: this.postForm.get("slug")?.value,
            title: this.postForm.get("title")?.value,
        };

        this.postService.save(post)
            .then(() => {
                this.toastService.info("Post saved");
                setTimeout(() => CreatePostComponent.navigateExternal(), 1500);
            })
            .catch(err => this.toastService.error(err.error.error));

    }

    updateCategoryInput() {
        M.FormSelect.init(document.querySelector("select")!, {
            dropdownOptions: {
                coverTrigger: true,
                closeOnClick: true,
                autoTrigger: true
            },
        });
    }

    private static navigateExternal() {
        window.location.href = environment.blogBaseUrl;
    }

}
