import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { AreaAllotDetailsPopupComponent } from '../area-allot-details-popup/area-allot-details-popup.component';
import { CategoryService } from '../../../master/category-master/services/category.service';

@Component({
  selector: 'app-je-details',
  templateUrl: './je-details.component.html',
  styleUrls: ['./je-details.component.scss']
})
export class JeDetailsComponent {
  bsModalRef!: BsModalRef;
  columns: any;
  categoryList :any;
  accordionItems = [
    { id: 1, heading: 'UP80-361575' },
    { id: 2, heading: 'UP80-89832' }
  ];
  openItemId: number | null = null; 
  isLoading: boolean = false;
  constructor(
    private bsmoalService: BsModalService,
    private CategoryService : CategoryService
  ) {}

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


  getCategoryList() {
    this.isLoading = true;
    const page = {
      pageNo: 1,
      pageSize: 5000,
    };
    this.CategoryService.categoryList(page).subscribe(
      (data) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 600);
        this.categoryList = data?.body?.result || [];
      },
      (error) => {
        setTimeout(() => {
          this.isLoading = false;
        }, 600);
        console.error("Error fetching zone list", error);
      }
    );
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
      this.getCategoryList();
    } else {
      this.openItemId = itemId;
      this.getCategoryList();

    }
  }
  
}