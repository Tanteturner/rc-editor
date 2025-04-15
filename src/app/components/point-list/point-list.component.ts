import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { TrackPoint } from '../../models/openRollercoasterFile.interface';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'point-list',
  imports: [ DragDropModule ],
  templateUrl: './point-list.component.html',
  styleUrl: './point-list.component.scss'
})
export class PointListComponent {
  constructor(private fileService: FileService) {
    fileService.getFile().subscribe( fileContent => {
      this.points = fileContent?.trackPoints;
    })
  }

  drop(evt: CdkDragDrop<TrackPoint[]>) {
    moveItemInArray(this.points,evt.previousIndex,evt.currentIndex);
    console.log("drop");
  }

  points: TrackPoint[] = []
}
