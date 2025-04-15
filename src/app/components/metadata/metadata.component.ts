import { Component } from '@angular/core';
import { FileService } from '../../services/file.service';
import { orcfHeader } from '../../models/openRollercoasterFile.interface';

@Component({
  selector: 'metadata',
  imports: [],
  templateUrl: './metadata.component.html',
  styleUrl: './metadata.component.scss'
})
export class MetadataComponent {
  constructor(private fileService: FileService) {
    fileService.loadedFileChanged$.subscribe(fileContent => {
      this.metadata = fileContent.header;
    })
  }

  metadata: orcfHeader = {version:""}
}
