import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { ServerModel } from "../models/server.model";

@Component({
  selector: "app-cockpit",
  templateUrl: "./cockpit.component.html",
  styleUrls: ["./cockpit.component.css"],
})
export class CockpitComponent implements OnInit {
  // newServerName = "";
  newServerContent = "";
  @ViewChild("serverContentInput")
  serverContentInput: ElementRef;

  @Output() onAddServer = new EventEmitter<ServerModel>();
  @Output() onAddBlueprint = new EventEmitter<ServerModel>();

  constructor() {}

  ngOnInit(): void {}

  addServer(nameInput: HTMLInputElement) {
    this.onAddServer.emit({
      type: "server",
      name: nameInput.value,
      content: this.serverContentInput.nativeElement.value,
    });
  }

  addBlueprint(nameInput: HTMLInputElement) {
    this.onAddBlueprint.emit({
      type: "blueprint",
      name: nameInput.value,
      content:this.serverContentInput.nativeElement.value,
    });
  }
}
