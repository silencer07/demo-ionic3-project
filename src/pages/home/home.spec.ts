import { async, TestBed } from '@angular/core/testing';
import {
  AlertController, App, Config, DomController, Form, IonicPageModule, Keyboard, MenuController, NavController,
  NavParams,
  Platform
} from 'ionic-angular';
import { HomePage } from './home';
import { NavControllerMock, NavParamsMock, AlertControllerMock } from 'ionic-mocks';
import {ProjectProvider} from "../../providers/project/project";
import {instance, mock} from "ts-mockito";
import {PlatformMock} from "../../../test-config/mocks-ionic";

describe('HomePage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [
        IonicPageModule.forChild(HomePage)
      ],
      providers: [
        //mocking since they are actual dependency of the Homepage component
        { provide: NavController,  useValue: NavControllerMock.instance() },
        { provide: NavParams,  useValue: NavParamsMock.instance() },
        { provide: ProjectProvider,  useValue: instance(mock(ProjectProvider)) },
        { provide: AlertController,  useValue: AlertControllerMock.instance() },

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
});
