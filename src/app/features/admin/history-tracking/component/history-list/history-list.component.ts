import { Component } from '@angular/core';
import { HistoryService } from '../../service/history.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { HistoryMapComponent } from '../history-map/history-map.component';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrl: './history-list.component.scss'
})
export class HistoryListComponent {
  historyList: any;
  searchKeyword: any;
  columns: any;
  isLoading: boolean = false;

  constructor(private historyService: HistoryService, private bsmodalService: BsModalService) {
    this.historyService.historyData$.subscribe(data => {
      if (data === null) {
        this.isLoading = true;
        this.historyList = [];
        return;
      }
      
      this.historyList = data;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.setInitialTable()
  };

  setInitialTable() {
    this.columns = [
      {key: 'department_name', title: 'Department', width: '8%'},
      {key: 'user_name', title: 'User', width: '8%'},
      {key: 'Date', title: 'Date', width: '8%'},
      {key: 'In Time', title: 'In Time', width: '8%'},
      {key: 'Out Time', title: 'Out Time', width: '8%'},
      {key: 'Out Time', title: 'Duration', width: '8%'},
      {key: 'Out Time', title: 'Distance', width: '8%'},
      {key: 'In Address', title: 'In Address', width: '18%'},
      {key: 'Out Address', title: 'Out Address', width: '18%'},
      {key: 'Play back', title: 'Play back', width: '8%'}
    ]
  }

  bsModalRef!: BsModalRef
  goToHistory(item:any) {
    const initialState: ModalOptions = {
      initialState: {
        editData: item,
      },
    };
    this.bsModalRef = this.bsmodalService.show(
      HistoryMapComponent,
      Object.assign(initialState, {
        id: "confirmation",
        class: 'modal-xl modal-dialog-centered alert-popup',
      })
    );
  }


}
