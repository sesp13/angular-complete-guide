import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  routeSubscription?: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // ways to access the params
    // this.shapshotWay();
    this.reactiveWay();
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  shapshotWay(): void {
    // This way only catches once the params, it won't work if the same url changes it's params
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"],
    };
  }

  reactiveWay(): void {
    this.routeSubscription = this.route.params.subscribe((params: Params) => {
      this.user = {
        id: params.id,
        name: params.name,
      };
    });
  }
}
