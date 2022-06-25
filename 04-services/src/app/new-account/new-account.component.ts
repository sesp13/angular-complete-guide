import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AccountsService } from "../services/account.service";
import { LoggingService } from "../services/logging.service";

@Component({
  selector: "app-new-account",
  templateUrl: "./new-account.component.html",
  styleUrls: ["./new-account.component.css"],
})
export class NewAccountComponent implements OnInit, OnDestroy {
  statusSub?: Subscription;

  constructor(
    private accountService: AccountsService,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.statusSub = this.accountService.statusUpdated.subscribe(
      (status: string) => {
        console.log(`New status from service: ${status}`);
      }
    );
  }

  ngOnDestroy(): void {
    this.statusSub?.unsubscribe();
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }
}
