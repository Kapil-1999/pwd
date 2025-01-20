import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AreaAllotDetailsPopupComponent } from '../area-allot-details-popup/area-allot-details-popup.component';

@Component({
  selector: 'app-je-details',
  templateUrl: './je-details.component.html',
  styleUrl: './je-details.component.scss'
})
export class JeDetailsComponent {
  bsModalRef !: BsModalRef
  constructor(
    private bsmoalService : BsModalService
  ) {}

  openAreaPlot() {
     const initialState: ModalOptions = {
          initialState: {
            editData:  ''
          },
        };
        this.bsModalRef = this.bsmoalService.show(
          AreaAllotDetailsPopupComponent,
          Object.assign(initialState, {
            id: "confirmation",
            class: 'modal-lg modal-dialog-centered alert-popup',
          })
        );
  }
}
