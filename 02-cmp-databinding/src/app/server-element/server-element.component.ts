import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  Component,
  ContentChild,
  DoCheck,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  selector: "app-server-element",
  templateUrl: "./server-element.component.html",
  styleUrls: ["./server-element.component.css"],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ServerElementComponent
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterContentInit,
    OnDestroy
{
  @Input() element: {
    type: string;
    name: string;
    content: string;
  };

  @Input() name: string;

  @ViewChild("heading") header: ElementRef;
  @ContentChild("contentParagraph") contentParagraph: ElementRef;
  z;

  constructor() {
    console.log("constructor called!");
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("Ng on changes called!");
    console.log(changes);
  }

  ngOnInit(): void {
    console.log("Ng on init called!");
    console.log("ViewChild", this.header?.nativeElement?.textContent);
    console.log("Content", this.contentParagraph?.nativeElement?.textContent);
  }

  ngDoCheck(): void {
    console.log("Ng Do Check called!");
  }

  ngAfterContentInit(): void {
    console.log("Ng After Content Init called!");
    console.log(
      "Ng Content Paragraph",
      this.contentParagraph?.nativeElement?.textContent
    );
  }

  ngAfterContentChecked(): void {
    console.log("Ng After Content checked called!");
  }

  ngAfterViewInit(): void {
    console.log("Ng After view Init called!");
    console.log("ViewChild", this.header.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log("Ng After view checked called!");
  }

  ngOnDestroy(): void {
    console.log("Ng ON destroy");
  }
}
