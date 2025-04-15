import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { openRollercoasterFile } from '../models/openRollercoasterFile.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  private _loadedFile: openRollercoasterFile = {
    header: {
      version: ""
    },
    trackPoints: [],
    trackElements: []
  };
  private _loadedFile$ = new BehaviorSubject(this._loadedFile);

  loadFile(value: openRollercoasterFile): void {
    this._loadedFile = value;
    this._loadedFile$.next(this._loadedFile);
  }

  getFile() {
    return this._loadedFile$.asObservable();
  }
}
