import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent implements OnInit, OnDestroy {
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit: boolean = false;
  querySub?: Subscription;
  fragmentSub?: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.handleParams();
  }

  ngOnDestroy(): void {
    this.querySub?.unsubscribe();
    this.fragmentSub?.unsubscribe();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
  }

  handleParams() {
    // shapshot
    console.log("snapshot", this.route.snapshot.queryParams);
    console.log("snapshot", this.route.snapshot.fragment);

    // Reactive way
    this.querySub = this.route.queryParams.subscribe(
      (params) => (this.allowEdit = params["allowEdit"] === "1")
    );

    this.fragmentSub = this.route.fragment.subscribe((value) =>
      console.log("reactive", value)
    );
  }
}
