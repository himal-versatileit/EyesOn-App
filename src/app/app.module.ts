import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { DatePipe, Location } from "@angular/common";
import { MainInterceptor } from "./middleware/main.interceptor";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { ProfileReducer } from "./state-management/profile.interface";
import { ProfileEffect } from "./state-management/profile.effect";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { QRScanner } from "@ionic-native/qr-scanner/ngx";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ innerHTMLTemplatesEnabled: true }),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature("PROFILE", ProfileReducer),
    EffectsModule.forFeature([ProfileEffect]),
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Location,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MainInterceptor,
      multi: true,
    },
    QRScanner,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
