import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { openRollercoasterFile, TrackElement } from '../models/openRollercoasterFile.interface';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() {
    this.loadedFileChanged$.subscribe( file => {
      this._loadedFile = file;
    });

    this.trackElementsChanged$.subscribe( elements => {
      this._loadedFile.trackElements = elements;
    })
  }

  private _loadedFile: openRollercoasterFile = {
    header: {
      version: ''
    },
    trackPoints: [],
    trackElements: []
  };

  downloadFile() {
    const json = JSON.stringify(this._loadedFile);
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `export.orcf`;
    a.click();

    window.URL.revokeObjectURL(url);
  }

  loadedFileChanged$ = new Subject<openRollercoasterFile>();

  trackElementsChanged$ = new Subject<TrackElement[]>();
}
