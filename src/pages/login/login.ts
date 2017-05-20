import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../providers/auth-service/auth-service";
import {User} from "../../model/user";
import {ListPage} from "../list/list";

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
  hasSubmitted: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private formBuilder: FormBuilder,private authService: AuthService,
              private loadingController: LoadingController, private alertController: AlertController) {
    this.form = this.formBuilder.group({
      username: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ionViewDidLoad() {
  }

  authenticate(){
    this.hasSubmitted = true;

    if(this.form.valid){
      let loader = this.loadingController.create({
        content: "Logging in. Please wait..."
      });
      loader.present();
      this.authService.authenticate(this.form.value)
        .subscribe((user: User) => {
          loader.dismiss();
          this.navCtrl.setRoot(ListPage);
        }, (error: any) => {
          loader.dismiss();
          let message = this.alertController.create({
            title: 'Login Error',
            subTitle: 'Invalid username and/or password. If you registered already, please make sure to verify your email.',
            buttons: ['OK']
          });
          message.present();
        });
    }
  }

}
