import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Data, Router } from "@angular/router";
import { Subscription } from "rxjs";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit, OnDestroy {
  server: { id: number; name: string; status: string };
  dataSub?: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataSub = this.route.data.subscribe((data: Data) => {
      this.server = data.server;
    });
  }

  ngOnDestroy(): void {
    this.dataSub?.unsubscribe();
  }

  onEdit() {
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }
}
