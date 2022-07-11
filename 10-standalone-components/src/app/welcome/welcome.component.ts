import { Component } from '@angular/core';
// import { DetailsComponent } from './details/details.component';

@Component({
  // This won't work because welcome is not standalone
  // imports: [DetailsComponent],
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
})
export class WelcomeComponent {}
