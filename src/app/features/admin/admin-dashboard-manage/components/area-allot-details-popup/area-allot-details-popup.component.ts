import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-area-allot-details-popup',
  templateUrl: './area-allot-details-popup.component.html',
  styleUrl: './area-allot-details-popup.component.scss'
})
export class AreaAllotDetailsPopupComponent {

  accordionItems = [
    { id: 1, heading: 'Quality of Binder', status: 'Pending', content: 'This content is straight in the template.', isOpen: false },
    { id: 2, heading: 'Aggregate Impact Value or Los Angeles Abrasion Value', status: 'Pending', content: 'Some content goes here.', isOpen: false },
  ];

  constructor(
    private bsmodalService : BsModalService,
    private router : Router
  ){};

  toggleAccordion(id: number) {
    this.accordionItems = this.accordionItems.map((item) => ({
      ...item,
      isOpen: item.id === id ? !item.isOpen : false, 
    }));
  }

  openAreaForm() {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/admin/dashboard/area-plot-form']));
    window.open(url, '_blank');
  }

  close() {
    this.bsmodalService.hide()
  }
}
