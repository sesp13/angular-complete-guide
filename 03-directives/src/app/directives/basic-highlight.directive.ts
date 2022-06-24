import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
  selector: "[appBasicHighlight]",
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // this way to modify properties directly might not be the best way to do it
    this.elementRef.nativeElement.style.backgroundColor = "green";
  }
}
