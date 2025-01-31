import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AreaAllotDetailsPopupComponent } from '../area-allot-details-popup/area-allot-details-popup.component';

@Component({
  selector: 'app-je-details',
  templateUrl: './je-details.component.html',
  styleUrls: ['./je-details.component.scss']
})
export class JeDetailsComponent {
  bsModalRef!: BsModalRef;
  columns: any;
  categoryList = [
    { id: 1, cat: 'Earth Work',status: 'Pending', work: 16 },
    { id: 2, cat: 'Granular',status: 'Progress', work: 1 },
    { id: 3, cat: 'Earth Work',status: 'Finish', work: 5 }
  ];
  accordionItems = [
    { id: 1, heading: 'UP80-361575' },
    { id: 2, heading: 'UP80-89832' }
  ];
  openItemId: number | null = null; 
  constructor(private bsmoalService: BsModalService) {}

  ngOnInit() {
    this.setInitialtable();
  }

  setInitialtable() {
    this.columns = [
      { key: 'Category Name', title: 'Category Name' },
      { key: 'Total Work', title: 'Total Work', width: "5%" },
      { key: 'Work Status', title: 'Work Status', width: "5%" },
      { key: 'Work List', title: 'Work List', width: "10%" },
    ];
  }

  openAreaPlot() {
    const initialState: ModalOptions = {
      initialState: {
        editData: ''
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

  onOpenCategory(itemId: number) {
    if (this.openItemId === itemId) {
      this.openItemId = null;
      this.categoryList = [
        { id: 1, cat: 'Earth Work',status: 'Pending', work: 16 },
    { id: 2, cat: 'Granular',status: 'Progress', work: 1 },
    { id: 3, cat: 'Earth Work',status: 'Finish', work: 5 }
      ];
    } else {
      this.openItemId = itemId;
      this.categoryList = itemId === 1
        ? [
            { id: 1, cat: 'Earth Work', status: 'Pending', work: 16 },
            { id: 2, cat: 'Granular', status: 'Progress', work: 1 },
            { id: 3, cat: 'Earth Work',status: 'Finish', work: 5 }
          ]
        : [
            { id: 1, cat: 'test',status: 'Pending', work: 16 },
            { id: 2, cat: 'Granular',status: 'Progress', work: 1 },
            { id: 3, cat: 'Earth Work',status: 'Finish', work: 5 }
          ];
    }
  }
  
}