import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { CanComponentDeactivate } from "src/app/can-deactivate.guard";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-edit-server",
  templateUrl: "./edit-server.component.html",
  styleUrls: ["./edit-server.component.css"],
})
export class EditServerComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  server: { id: number; name: string; status: string };
  serverName = "";
  serverStatus = "";
  allowEdit: boolean = false;
  changesSaved: boolean = false;

  // Subscriptions
  paramsSub?: Subscription;
  querySub?: Subscription;
  fragmentSub?: Subscription;

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.handleParams();
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
    this.querySub?.unsubscribe();
    this.fragmentSub?.unsubscribe();
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {
      name: this.serverName,
      status: this.serverStatus,
    });
    this.changesSaved = true;
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  handleParams() {
    // shapshot
    // console.log("snapshot", this.route.snapshot.queryParams);
    // console.log("snapshot", this.route.snapshot.fragment);

    // Reactive way
    this.paramsSub = this.route.params.subscribe((params: Params) => {
      const id = Number.parseInt(params.id);
      this.server = this.serversService.getServer(id);
      this.serverName = this.server?.name;
      this.serverStatus = this.server?.status;
    });

    this.querySub = this.route.queryParams.subscribe(
      (params) => (this.allowEdit = params["allowEdit"] === "1")
    );

    this.fragmentSub = this.route.fragment.subscribe((value) => {
      // console.log("reactive", value)
    });
  }

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.allowEdit) return true;
    if (
      (this.serverName !== this.server?.name ||
        this.serverStatus !== this.server?.status) &&
      !this.changesSaved
    ) {
      return confirm("Do you want to discard changes?");
    } else {
      return true;
    }
  }
}
