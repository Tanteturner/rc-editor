import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { TrackElement } from '../../models/openRollercoasterFile.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'element-editor',
  imports: [ FormsModule ],
  templateUrl: './element-editor.component.html',
  styleUrl: './element-editor.component.scss'
})
export class ElementEditorComponent {
  constructor(private fileService: FileService) {
    fileService.loadedFileChanged$.subscribe(file => {
      this.elements = file.trackElements;
    })
  }

  elementColors = [
    "text-primary",
    "text-danger",
    "text-warning",
    "text-success",
  ]

  elementTypes = [
    "station",
    "block brake",
    "lift"
  ]

  elements: TrackElement[] = [];

  addElement() {
    this.elements.push({
      type: 'lift',
      startIndex: 0,
      endIndex: 0
    });
    this.elementsChanged();
  }

  deleteElement(index: number) {
    this.elements.splice(index,1);
    this.elementsChanged();
  }

  changeElementType(event: any, index: number) {
    this.elements[index].type = event.target.value;
    this.elementsChanged();
  }

  changeElementStartIndex(event: any, index: number) {
    this.elements[index].startIndex = Number(event.target.value);
    this.elementsChanged();
  }

  changeElementEndIndex(event: any, index: number) {
    this.elements[index].endIndex = Number(event.target.value);
    this.elementsChanged();
  }

  elementsChanged() {
    this.elements.sort((a,b) => a.startIndex - b.startIndex );
    this.fileService.trackElementsChanged$.next(this.elements);
  }
}
