import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { BlogRoutingModule } from "./blog-routing.module";
import { BlogComponent } from "./blog.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CommonModule } from "../../../common/src/common-module";
import { PostListComponent } from "./post-list/post-list.component";
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from "@angular/common/http";
import { LoggingInterceptor } from "projects/common/src/services/interceptors/logging.interceptor";
import { PostListItemComponent } from "./post-list/post-list-item/post-list-item.component";
import { PostComponent } from "./post/post.component";
import { MarkdownModule, MarkedOptions } from "ngx-markdown";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { PostListSkeletonComponent } from './post-list/post-list-skeleton/post-list-skeleton.component';
import { NgxPaginationModule } from "ngx-pagination";
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { AuthInterceptor } from "../../../common/src/services/interceptors/auth.interceptor";
import { CreatePostComponent } from './create-post/create-post.component';
import { ReactiveFormsModule } from "@angular/forms";
import {SIMPLEMDE_CONFIG, SimplemdeModule} from "ng2-simplemde";
import { TooltipModule } from "ng2-tooltip-directive";
import { ToastrModule } from "ngx-toastr";
import * as marked from "marked";
import { CommentComponent } from './comment/comment.component';

@NgModule({
	declarations: [
		BlogComponent,
		PostListComponent,
		PostListItemComponent,
		PostComponent,
		PostListSkeletonComponent,
		CreatePostComponent,
		CommentComponent,
	],
	imports: [
		BlogRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		CommonModule,
		HttpClientModule,
		NgxPaginationModule,
		NgxSkeletonLoaderModule,
		TooltipModule,
		ScrollToModule.forRoot(),
		MarkdownModule.forRoot({
			loader: HttpClient,
			markedOptions: {
				provide: MarkedOptions,
				useValue: {
					gfm: true,
					breaks: false,
					pedantic: false,
					smartLists: true,
					smartypants: false,
				},
			},
		}),
		ToastrModule.forRoot({
			timeOut: 5000,
			maxOpened: 5,
			preventDuplicates: true,
			enableHtml: true,
			positionClass: "toast-bottom-center",
		}),
		SimplemdeModule.forRoot({
			provide: SIMPLEMDE_CONFIG,
			useValue: {
				sideBySideFullscreen: true,
				previewRender: (plainText: string) => {
					return marked(plainText, {gfm: true}); // Returns HTML from a custom parser
				},
				showIcons: ["strikethrough", "code", "table", "redo", "heading", "undo", "horizontal-rule"],
				renderingConfig: {
					codeSyntaxHighlighting: true,
					markedOptions: {gfm: true},
				},
				spellChecker: false,
				status: ["autosave", "cursor"],
			},
		}),
		ReactiveFormsModule,
	],
	providers: [
		{provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
		{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
	],
	bootstrap: [BlogComponent],
})
export class BlogModule {
}
