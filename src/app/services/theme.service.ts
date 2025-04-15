import { Injectable } from '@angular/core';
import { Theme } from '../models/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  private getTheme() {
    const style = getComputedStyle(document.body);
    this._theme = {
      primary: style.getPropertyValue('--bs-primary'),
      secondary: style.getPropertyValue('--bs-secondary'),
      success: style.getPropertyValue('--bs-success'),
      info: style.getPropertyValue('--bs-info'),
      warning: style.getPropertyValue('--bs-warning'),
      danger: style.getPropertyValue('--bs-danger'),
      light: style.getPropertyValue('--bs-light'),
      dark: style.getPropertyValue('--bs-dark'),
      emphasis: style.getPropertyValue('--bs-emphasis-color'),
      border: style.getPropertyValue('--bs-border-color')
    };
  }

  private _theme?: Theme;

  get theme(): Theme {
    if(this._theme == undefined) {
      this.getTheme();
    }
    return this._theme as Theme;
  }
  
}
