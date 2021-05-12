import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './navigation/header/header.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';
import { environment } from '../environments/environment';
import { UiService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [AuthService, TrainingService, UiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
