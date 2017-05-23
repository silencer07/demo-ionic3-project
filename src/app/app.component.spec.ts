import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {AuthService} from "../providers/auth-service/auth-service";

describe('AppComponent', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyApp ],
      imports: [
        IonicModule.forRoot(MyApp)
      ],
      providers: [
        StatusBar,
        SplashScreen,
        AuthService
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyApp);
    component = fixture.componentInstance;
  });

  it ('should create a valid instance of AppComponent', () => {
    expect(component instanceof MyApp).toBe(true);
  });
});
