import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  animations: [
    trigger("divState", [
      state(
        "normal",
        style({ "background-color": "red", transform: "translateX(0)" })
      ),
      state(
        "highlighted",
        style({ "background-color": "blue", transform: "translateX(100px)" })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
    ]),
    trigger("wildState", [
      state(
        "normal",
        style({
          "background-color": "red",
          transform: "translateX(0) scale(1)",
        })
      ),
      state(
        "highlighted",
        style({
          "background-color": "blue",
          transform: "translateX(100px) scale(1)",
        })
      ),
      state(
        "shrunken",
        style({
          "background-color": "green",
          transform: "translateX(100px) scale(0.5)",
        })
      ),
      transition("normal => highlighted", animate(300)),
      transition("highlighted => normal", animate(800)),
      transition("shrunken <=> *", [
        style({
          "background-color": "orange",
        }),
        animate(1000, style({ "border-radius": "50px" })),
        animate(500),
      ]),
    ]),
    trigger("list1", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      // this is the transition from nothing to the first main status
      transition("void => *", [
        style({
          opacity: 0,
          transform: "translateX(-100px)",
        }),
        animate(400),
      ]),
      transition("* => void", [
        animate(
          500,
          style({
            transform: "translateX(100px)",
            opacity: 0,
          })
        ),
      ]),
    ]),
    trigger("list2", [
      state(
        "in",
        style({
          opacity: 1,
          transform: "translateX(0)",
        })
      ),
      transition("void => *", [
        animate(
          1000,
          keyframes([
            style({
              transform: "translateX(-100px)",
              opacity: 0,
              offset: 0,
            }),
            style({
              transform: "translateX(-50px)",
              opacity: 0.5,
              offset: 0.3,
            }),
            style({
              transform: "translateX(-20px)",
              opacity: 1,
              offset: 0.8,
            }),
            style({
              transform: "translateX(0px)",
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
      transition("* => void", [
        group([
          animate(
            300,
            style({
              color: "red",
            })
          ),
          animate(
            500,
            style({
              transform: "translateX(100px)",
              opacity: 0,
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  state = "normal";
  wildState = "normal";

  list = ["Milk", "Sugar", "Bread"];

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(index: number): void {
    this.list.splice(index, 1);
  }

  onAnimate(): void {
    this.state = this.state === "normal" ? "highlighted" : "normal";
    this.wildState = this.wildState === "normal" ? "highlighted" : "normal";
  }

  onShrink(): void {
    this.wildState = "shrunken";
  }

  animationStarted(event: any) {
    console.log(event);
  }

  animationDone(event: any) {
    console.log(event);
  }
}
