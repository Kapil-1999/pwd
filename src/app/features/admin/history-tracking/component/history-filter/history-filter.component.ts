import { Component } from '@angular/core';
import { CommonService } from '../../../../shared/services/common.service';
import { PoiAllocationService } from '../../../allocation/poi-allocation/services/poi-allocation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrl: './history-filter.component.scss'
})
export class HistoryFilterComponent {
  config = {
    displayKey: "text",
    search: true,
    height: '300px'
  };
  desigantionList: any;
  userList: any;
  selectDate = [
    { id: 'Today', dateValue: 'Today' },
    { id: 'Yesterday', dateValue: 'Yesterday' },
    { id: 'Weekly', dateValue: 'Weekly' },
    { id: 'Last 30 Days', dateValue: 'Last 30 Days' },
    { id: 'Custom', dateValue: 'Custom' }
  ];
  historyForm!: FormGroup;
  customDate: boolean = false;;

  constructor(
    private commonService: CommonService,
    private poiService: PoiAllocationService,
    private fb: FormBuilder,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.setInitialValue()
    this.getDesignationList()
  }

  setInitialValue() {

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0);

    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59);

    this.historyForm = this.fb.group({
      designation: [null, [Validators.required]],
      user: [null, [Validators.required]],
      timeformat: ['Today', [Validators.required]],
      fromDate: [this.formatDateForInput(todayStart)],
      toDate: [this.formatDateForInput(todayEnd)],
    });

    this.historyForm.get('timeformat')?.valueChanges.subscribe((value) => {
      let newFromDate = new Date(todayStart);
      let newToDate = new Date(todayEnd);

      if (value === 'Custom') {
        this.historyForm.get('fromDate')?.setValue(this.formatDateForInput(todayStart));
        this.historyForm.get('toDate')?.setValue(this.formatDateForInput(todayEnd));
      } else {
        switch (value) {
          case 'Yesterday':
            newFromDate.setDate(newFromDate.getDate() - 1);
            newToDate.setDate(newToDate.getDate() - 1);
            break;
          case 'Weekly':
            newFromDate.setDate(newFromDate.getDate() - 7);
            break;
          case 'Last 30 Days':
            newFromDate.setDate(newFromDate.getDate() - 30);
            break;
          default:
            break;
        }
        this.historyForm.get('fromDate')?.setValue(this.formatDateForInput(newFromDate));
        this.historyForm.get('toDate')?.setValue(this.formatDateForInput(newToDate));
      }
    });
  }

  formatDateForInput(date: Date) {
    return this.datepipe.transform(date, 'yyyy-MM-ddTHH:mm:ss');
  }

  getDesignationList() {
    this.commonService.designationList().subscribe((res) => {
      this.desigantionList = res?.body?.result;
    });
  }

  onChangeDesi(event: any) {
    this.getUserBydesignation(event.value?.value)
  }

  getUserBydesignation(id: any) {
    this.poiService.getUserBudesi(id).subscribe((res: any) => {
      this.userList = res?.body?.result;
    })
  }


  timecheck(event: any) {
    console.log(event.target.value);
    
    if (event.target.value === "Custom") {
      this.customDate = true;
    } else {
      this.customDate = false;
    }
  }
}
