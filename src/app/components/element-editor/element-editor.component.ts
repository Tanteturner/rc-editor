import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { TrackElement } from '../../models/openRollercoasterFile.interface';

@Component({
  selector: 'element-editor',
  imports: [],
  templateUrl: './element-editor.component.html',
  styleUrl: './element-editor.component.scss'
})
export class ElementEditorComponent {
  constructor(private fileService: FileService) {
    fileService.getFile().subscribe(file => {
      this.elements = file.trackElements;
    })
  }

  elements: TrackElement[] = [];
}
