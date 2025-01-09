import { Component } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrl: './create-area.component.scss'
})
export class CreateAreaComponent {
  label:string = 'Create';

  constructor(
    private modalService: BsModalService
  ) {}

  close() {
    this.modalService.hide()
  }
}
