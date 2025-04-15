import { Component } from '@angular/core';
import { CanvasBoxComponent } from "./components/canvas-box/canvas-box.component";
import { MetadataComponent } from "./components/metadata/metadata.component";
import { PointListComponent } from "./components/point-list/point-list.component";
import { FileUploadComponent } from "./components/file-upload/file-upload.component";
import { ElementEditorComponent } from './components/element-editor/element-editor.component';
import { FileService } from './services/file.service';
import { DownloadButtonComponent } from "./components/download-button/download-button.component";

@Component({
  selector: 'app-root',
  imports: [CanvasBoxComponent, MetadataComponent, PointListComponent, FileUploadComponent, ElementEditorComponent, DownloadButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
