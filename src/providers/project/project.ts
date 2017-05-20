import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Project} from "../../model/project";
import {Observable} from "rxjs";

@Injectable()
export class ProjectProvider {

  private static PROJECT_KEY: string = "DEMO_PROJECT_KEY";

  constructor() {
    let key = ProjectProvider.PROJECT_KEY;
    let stored = localStorage.getItem(key);
    if(!stored){
      let projects:Array<Project> = [];
      for(let x = 1; x <= 2; x++){
        let project = new Project();
        project.id = x;
        project.name = `test project ${x}`;
        projects.push(project);
      }
      localStorage.setItem(key, JSON.stringify(projects));
    }
  }

  list(): Observable<Array<Project>> {
    return Observable.of(JSON.parse(localStorage.getItem(ProjectProvider.PROJECT_KEY)) as Array<Project>);
  }

  create(name: string): Observable<Project> {
    return this.searchByName(name).flatMap((result: Project) => {
      if(result !== null){
        return Observable.throw(`${name} already exists(case-insensitive)`);
      }

      return this.list().flatMap((projects: Array<Project>) => {
        let id = Math.max(...projects.map(proj => proj.id)) + 1;
        let newProject = new Project();
        newProject.id = id;
        newProject.name = name;
        projects.push(newProject);
        localStorage.setItem(ProjectProvider.PROJECT_KEY, JSON.stringify(projects));

        return Observable.of(newProject);
      });
    });
  }

  update(id: number, name: string): Observable<Project> {
    return this.searchById(id).flatMap(proj => {
      if(proj !== null){
        proj.name = name;
        return this.list().flatMap(projects => {
          let index = projects.findIndex(p => p.id === id);
          projects[index] = proj;

          return Observable.of(proj);

        });
      }
      return Observable.throw(`project with id:${id} does not exists`);
    });
  }

  searchById(id: number): Observable<Project> {
    return this.list().flatMap((projects: Array<Project>) =>
      Observable.of(projects.length > 0 ? projects.filter(proj => proj.id === id)[0] : null)
    );
  }

  searchByName(name: string): Observable<Project> {
    return this.list().flatMap((projects: Array<Project>) =>
      Observable.of(projects.length > 0 ? projects.filter(proj => proj.name.toLowerCase() === name)[0] : null)
    );
  }
}
