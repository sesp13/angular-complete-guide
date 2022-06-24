import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";

@Directive({
  selector: "[appBetterHighlight]",
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = "white";
  @Input() highlightColor: string = "blue";

  @HostBinding("style.border") border: string;

  constructor(private htmlElement: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.border = "10px solid black";
    this.setDefaultColor();
  }

  @HostListener("mouseenter") mouseover(eventData: Event) {
    this.renderer.setStyle(
      this.htmlElement.nativeElement,
      "background-color",
      this.highlightColor
    );
    this.renderer.setStyle(this.htmlElement.nativeElement, "color", "white");
  }

  @HostListener("mouseleave") mouseleave(eventData: Event) {
    this.setDefaultColor();
  }

  setDefaultColor(): void {
    this.renderer.setStyle(
      this.htmlElement.nativeElement,
      "background-color",
      this.defaultColor
    );
    this.renderer.setStyle(this.htmlElement.nativeElement, "color", "black");
  }
}
