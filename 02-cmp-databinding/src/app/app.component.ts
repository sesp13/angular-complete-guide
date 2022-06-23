import { Component } from "@angular/core";
import { ServerModel } from "./models/server.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  serverElements: ServerModel[] = [
    { type: "server", name: "Test Server", content: "Just a test!" },
    { type: "server", name: "Test Server", content: "Just a test!" },
    { type: "server", name: "Test Server", content: "Just a test!" },
  ];

  onServerAdded(serverData: ServerModel) {
    this.serverElements.push({
      type: "server",
      name: serverData.name,
      content: serverData.content,
    });
  }

  onBluePrintAdded(bluePrintData: ServerModel) {
    this.serverElements.push({
      type: "blueprint",
      name: bluePrintData.name,
      content: bluePrintData.content,
    });
  }
}
