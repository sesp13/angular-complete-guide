import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated: boolean = false;

  userSub?: Subscription;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userSub = this.userService.activatedEmitter.subscribe({
      next: (value: boolean) => (this.userActivated = value),
    });
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }
}
