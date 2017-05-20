import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HomePage} from "../home/home";
import {Project} from "../../model/project";
import {ProjectProvider} from "../../providers/project/project";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  items: Array<Project>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private projectProvider: ProjectProvider) {
    this.projectProvider.list().subscribe(projects => this.items = projects);
  }

  itemTapped(event, item) {
    this.navCtrl.push(HomePage, {
      item: item
    });
  }
}
