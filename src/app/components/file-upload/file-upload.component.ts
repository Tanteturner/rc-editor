import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'file-upload',
  imports: [],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {

  constructor(private fileService: FileService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if(!input.files || input.files.length === 0) {
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result as string;
      this.handleCoasterFile(content);
    };

    reader.readAsText(file);
  }

  handleCoasterFile(content: string) {
    try {
      const parsed = JSON.parse(content);
      console.log('Parsed coaster file:', parsed);
      this.fileService.loadedFileChanged$.next(parsed);
    } catch (e) {
      console.error('Invalid file format', e);
    }
  }
}
