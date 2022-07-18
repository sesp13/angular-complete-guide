import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core.module';

// Ngrx
import { AppReducer } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot(AppReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 20,
    }),
    EffectsModule.forRoot([AuthEffects]),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
