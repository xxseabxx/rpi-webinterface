import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../services/app.service';
import {Settings} from "../../models/settings.model";

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  public log: string = null;

  /* two-way databinding for settings*/
  _settings: Settings;
  @Input()
  set settings(val: Settings) {
    this.settingsChange.emit(val);
    this._settings = val;
  }
  get settings() {
    return this._settings;
  }
  @Output()
  settingsChange: EventEmitter<Settings> = new EventEmitter<Settings>();

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getLog();
  }

  getLog(): void {
    this.log = null;
    this.appService.getLog()
      .subscribe(res => {
        this.log = res;
      }, (err: any) => {console.error(err); });
  }

  deleteLog(): void {
    this.appService.deleteLog()
      .subscribe(res => {
        this.log = res;
      }, (err: any) => {console.error(err); });
  }

  copyMessage(text){
    navigator.clipboard.writeText(text).then().catch(e => console.error(e));
  }

}
