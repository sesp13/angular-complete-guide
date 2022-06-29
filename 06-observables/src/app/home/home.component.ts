import { Component, OnDestroy, OnInit } from "@angular/core";
import { Observable, Observer, Subscription } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  countSub?: Subscription;

  constructor() {}

  ngOnInit(): void {
    // this.countSub = interval(1000).subscribe((next) => {
    //   console.log(next);
    // });

    const customInterval = new Observable((observer: Observer<number>) => {
      let count = 0;
      const myInterval = setInterval(() => {
        observer.next(count);
        if (count == 5) {
          clearInterval(myInterval);
          observer.complete();
        }
        if (count > 6) {
          observer.error(new Error("A simple error"));
        }
        count++;
      }, 1000);
    });

    this.countSub = customInterval
      .pipe(
        filter((data) => data > 0),
        map((data: number) => `Round ${data + 1}`),
        map((data: string) => `My second map: ${data}`),
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(`Error in my observable: ${error}`);
        },
        complete: () => {
          console.log("The observable was completed!!");
        },
      });
  }

  ngOnDestroy(): void {
    this.countSub?.unsubscribe();
  }
}
