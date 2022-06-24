import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective implements OnInit {
  clickClass = 'dropdown-directive-class';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {}

  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    if (this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.addClass(this.elementRef.nativeElement, this.clickClass);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, this.clickClass);
    }
  }
}
