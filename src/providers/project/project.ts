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

  save(name: string): Observable<Project> {
    if(!name){
      return Observable.throw("name cannot be blank")
    }

    return this.searchByName(name).flatMap((result: Project) => {
      if(result){
        return Observable.throw(`${name} already exists(case-insensitive)`);
      }

      return this.list().flatMap((projects: Array<Project>) => {
        projects = projects ? projects : [];
        let id = projects.length ? Math.max(...projects.map(proj => proj.id)) + 1 : 1;
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
    return this.searchById(id).flatMap(byId => {
      if(byId !== null){
        return this.searchByName(name).flatMap(byName =>{
          if(!byName) {
            return this.list().flatMap(projects => {
              byId.name = name;
              let index = projects.findIndex(p => p.id === id);
              projects[index] = byId;
              localStorage.setItem(ProjectProvider.PROJECT_KEY, JSON.stringify(projects));
              return Observable.of(byId);
            });
          } else {
            return Observable.throw(`project with name ${name} already exists`);
          }
        });
      }
      return Observable.throw(`project with id:${id} does not exists`);
    });
  }

  saveOrUpdate(project: Project): Observable<Project> {
    return project.id > 0 ? this.update(project.id, project.name) : this.save(project.name);
  }

  searchById(id: number): Observable<Project> {
    return this.list().flatMap((projects: Array<Project>) =>
      Observable.of(projects && projects.length > 0 ? projects.find(proj => proj.id === id) : null)
    );
  }

  searchByName(name: string): Observable<Project> {
    return this.list().flatMap((projects: Array<Project>) => {
      let project = projects && projects.length > 0 ? projects.find(proj => proj.name.toLowerCase() === name) : null;
      return Observable.of(project);
    });
  }
}
