import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
import {Project} from "../../model/project";
import {ProjectProvider} from "../../providers/project/project";
import {Validator} from "validator.ts/Validator";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  project: Project = new Project();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private projectProvider: ProjectProvider,
              private alertController: AlertController) {
    this.project = navParams.get('item') ? navParams.get('item') : this.project;
  }

  saveOrUpdateProject(): void {
    let validator = new Validator();
    let errors = validator.validate(this.project);
    if(errors.length === 0){
      this.projectProvider.saveOrUpdate(this.project).subscribe(project => {
        this.navCtrl.pop();
      }, error => {
        let message = this.alertController.create({
          title: 'Error',
          subTitle: error,
          buttons: ['OK']
        });
        message.present();
      });
    } else {
      let message = this.alertController.create({
        title: 'Error',
        subTitle: errors.map(error => error.errorMessage).toString(),
        buttons: ['OK']
      });
      message.present();
    }

  }
}
