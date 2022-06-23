import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ServerModel } from "../models/server.model";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"],
})
export class CockpitComponent implements OnInit {
  newServerName = "";
  newServerContent = "";
  @Output() onAddServer = new EventEmitter<ServerModel>();
  @Output() onAddBlueprint = new EventEmitter<ServerModel>();

  constructor() {}

  ngOnInit(): void {}

  addServer() {
    this.onAddServer.emit({
      type: "server",
      name: this.newServerName,
      content: this.newServerContent,
    });
  }

  addBlueprint() {
    this.onAddBlueprint.emit({
      type: "blueprint",
      name: this.newServerName,
      content: this.newServerContent,
    });
  }
}
