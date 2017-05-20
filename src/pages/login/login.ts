import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, EmailCredentials} from "../../providers/auth-service/auth-service";
import {User} from "../../model/user";
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  form: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,private authService: AuthService,
              private loadingController: LoadingController, private alertController: AlertController) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [true]
    });

    this.authService.storedCredentials.subscribe((cred: EmailCredentials) => {
      if(cred){
        this.form.patchValue(cred);
      }
    });
  }

  ionViewDidLoad() {
  }

  authenticate(){
    let loader = this.loadingController.create({
      content: "Logging in. Please wait..."
    });
    loader.present();
    this.authService.authenticate(this.form.value)
      .subscribe((user: User) => {
        loader.dismissAll();
        this.navCtrl.setRoot(HomePage);
      }, (error: any) => {
        loader.dismissAll();
        let message = this.alertController.create({
          title: 'Login Error',
          subTitle: 'Invalid username and/or password. If you registered already, please make sure to verify your email.',
          buttons: ['OK']
        });
        message.present();
      });
  }

}
