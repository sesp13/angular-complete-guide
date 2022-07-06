import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Post } from "./models/post.interface";
import { PostService } from "./post.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching: boolean = false;
  @ViewChild("postForm") postForm: NgForm;
  error: any = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.fecthPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService.savePost(postData).subscribe((response) => {
      // Body
      console.log(response.body);
      this.postForm.reset();
      this.fecthPosts();
    });
  }

  onFetchPosts() {
    // Send Http request
    this.fecthPosts();
  }

  onClearPosts() {
    // Send Http request
    this.postService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  private fecthPosts(): void {
    this.isFetching = true;
    this.postService.fetchPosts().subscribe({
      next: (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error: (error) => {
        this.isFetching = false;
        this.error = error.message;
      },
    });
  }

  onHandleError(): void {
    this.error = null;
    this.isFetching = false;
  }
}
