import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Data } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-error-page",
  templateUrl: "./error-page.component.html",
  styleUrls: ["./error-page.component.css"],
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  errorMessage: any;

  dataSub?: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.dataSub = this.route.data.subscribe((data: Data) => {
      this.errorMessage = data["message"];
    });
  }

  ngOnDestroy(): void {
    this.dataSub?.unsubscribe();
  }
}
