import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Directives
import { BasicHighlightDirective } from "./directives/basic-highlight.directive";
import { BetterHighlightDirective } from './directives/better-highlight.directive';

// Component
import { AppComponent } from "./app.component";
import { UnlessDirective } from './directives/unless.directive';

@NgModule({
  declarations: [AppComponent, BasicHighlightDirective, BetterHighlightDirective, UnlessDirective],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
