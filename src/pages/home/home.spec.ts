import { async, TestBed } from '@angular/core/testing';
import {
  AlertController, App, Config, DomController, Form, IonicPageModule, Keyboard, MenuController, NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import { HomePage } from './home';
import { NavControllerMock, NavParamsMock, AlertControllerMock } from 'ionic-mocks';
import {ProjectProvider} from "../../providers/project/project";
import {PlatformMock} from "../../../test-config/mocks-ionic";
import {Observable} from "rxjs";
import {Project} from "../../model/project";
import {Validator} from "validator.ts/Validator";

describe('HomePage', () => {
  let fixture;
  let component: HomePage;
  let projectProvider;
  let navController;
  let alertController;
  let navParams;

  beforeEach(async(() => {
    navController = NavControllerMock.instance();
    alertController = AlertControllerMock.instance();
    navParams = NavParamsMock.instance();
    projectProvider = <ProjectProvider>{
      saveOrUpdate: (project: Project) => Observable.of(component.project)
    };

    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        IonicPageModule.forChild(HomePage)
      ],
      providers: [
        //mocking since they are actual dependency of the Homepage component
        { provide: NavController,  useValue: navController },
        { provide: NavParams,  useValue: navParams },
        { provide: ProjectProvider,  useValue: projectProvider },
        { provide: AlertController,  useValue: alertController },

        //test fixture that needs to be mock
        { provide: Platform,  useClass: PlatformMock },

        //uses the real thing
        Config,
        App,
        MenuController,
        DomController,
        Keyboard,
        Form,
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it ('should create a valid instance of HomePage', () => {
    expect(component instanceof HomePage).toBe(true);
  });

  it ('should show error message when project is not valid', () => {
    component.saveOrUpdateProject();
    expect(alertController.create).toHaveBeenCalled();
  });

  it ('should have an instance of project when passed to params is null', () => {
    expect(component.project).toBeTruthy();
  });

  it ('should have shown an alert message when provider throws error', () => {
    projectProvider.saveOrUpdate = (p: Project) => Observable.throw("some errors");

    component.saveOrUpdateProject();

    expect(alertController.create).toHaveBeenCalled();
  });

  it ('should go back when saving a valid project', () => {
    let validator = new Validator();
    component.project.name = "test";
    let errors = validator.validate(component.project);
    expect(errors.length).toEqual(0);

    component.saveOrUpdateProject();

    expect(alertController.create).toHaveBeenCalledTimes(0);
    expect(navController.pop).toHaveBeenCalled();
  });
});
