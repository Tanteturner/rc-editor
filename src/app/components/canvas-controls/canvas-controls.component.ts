import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {output} from '@angular/core';

@Component({
  selector: 'canvas-controls',
  imports: [FormsModule],
  templateUrl: './canvas-controls.component.html',
  styleUrl: './canvas-controls.component.scss'
})
export class CanvasControlsComponent {
  arrowsVisible: boolean = false;
  changeArrowsVisible = output<boolean>();

}
