import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {Project} from "../../model/project";
import {ProjectProvider} from "../../providers/project/project";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  items: Array<Project>;

  constructor(public navCtrl: NavController, private projectProvider: ProjectProvider) {
  }

  itemTapped(event, item) {
    this.navCtrl.push(HomePage, {
      item: item
    });
  }

  ionViewWillEnter() {
    this.projectProvider.list().subscribe(projects => this.items = projects);
  }
}
