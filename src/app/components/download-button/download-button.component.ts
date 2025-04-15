import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'download-button',
  imports: [],
  templateUrl: './download-button.component.html',
  styleUrl: './download-button.component.scss'
})
export class DownloadButtonComponent {
  constructor(private fileService: FileService) {}

  downloadFile() {
    this.fileService.downloadFile();
  }
}
