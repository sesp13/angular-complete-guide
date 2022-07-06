import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./models/post.interface";

@Injectable({ providedIn: "root" })
export class PostService {
  private postsUrl =
    "https://firestore-grpah-default-rtdb.firebaseio.com/posts.json";

  constructor(private http: HttpClient) {}

  savePost(postData: Post): Observable<any> {
    return this.http.post<Post>(this.postsUrl, postData, {
      observe: "response",
    });
  }

  fetchPosts(): Observable<Post[]> {
    let params = new HttpParams().set("print", "pretty");
    params = params.append("custom", "key");

    return this.http
      .get<{ [key: string]: Post }>(this.postsUrl, {
        headers: new HttpHeaders({
          "custom-header": "hello",
        }),
        params,
      })
      .pipe(
        map((responseData) => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            postsArray.push({ ...responseData[key], id: key });
          }
          return postsArray;
        }),
        catchError((errorResponse) => {
          // Generic error handling
          console.log("This error was handled first in the pipe!");
          return throwError(errorResponse);
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(this.postsUrl, { observe: "events", responseType: "text" })
      .pipe(
        tap((event) => {
          console.log(event);
          if (event.type === HttpEventType.Sent) {
            // ...
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        })
      );
  }
}
