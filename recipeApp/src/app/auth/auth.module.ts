import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

// Modules
import { AuthRoutingModule } from "./auth-routing.module";
import { SharedModule } from "../shared/shared.module";

// Components
import { AuthComponent } from "./auth.component";

@NgModule({
  declarations: [AuthComponent],
  imports: [FormsModule ,AuthRoutingModule, SharedModule]
})
export class AuthModule {}