import { Component, EventEmitter, Output } from '@angular/core';
import { CommonService } from '../../../../shared/services/common.service';
import { PoiAllocationService } from '../../../allocation/poi-allocation/services/poi-allocation.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HistoryService } from '../../service/history.service';

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
  customDate: boolean = false;
  historyList :any;

  constructor(
    private commonService: CommonService,
    private poiService: PoiAllocationService,
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private historyService: HistoryService
  ) { }

  ngOnInit() {
    this.setInitialValue()
    this.getDesignationList()
  }

  ngOnDestroy() {
    this.historyService.updateHistoryData([]);
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

    this.historyForm.get('fromDate')?.valueChanges.subscribe(value => {
      if (value && value.includes('T')) {
        this.historyForm.get('fromDate')?.setValue(this.formatDateForInput(value), {emitEvent: false});
      }
    });
    
    this.historyForm.get('toDate')?.valueChanges.subscribe(value => {
      if (value && value.includes('T')) {
        this.historyForm.get('toDate')?.setValue(this.formatDateForInput(value), {emitEvent: false});
      }
    });
  }

  formatDateForInput(date: Date | string) {
    let dateObj: Date;
    
    if (typeof date === 'string') {
      dateObj = new Date(date);
    } else {
      dateObj = date;
      
      if (dateObj.getHours() === 0 && dateObj.getMinutes() === 0 && dateObj.getSeconds() === 0) {      
        dateObj.setSeconds(1);
      }
    }
    
    return this.datepipe.transform(dateObj, 'yyyy-MM-dd HH:mm:ss')?.replace('T', ' ');
  }

  getDesignationList() {
    this.commonService.designationList().subscribe((res) => {
      this.desigantionList = res?.body?.result;
    });
  }

  onChangeDesi(event: any) {
    this.userList = [];
    this.historyForm.controls['user'].setValue(null);
    if(event.value?.value) {
      this.getUserBydesignation(event.value?.value)
    } 
  }

  getUserBydesignation(id: any) {
    this.poiService.getUserBudesi(id).subscribe((res: any) => {
      this.userList = res?.body?.result;
    })
  }


  timecheck(event: any) {
    if (event.target.value === "Custom") {
      this.customDate = true;
      this.historyForm.get('fromDate')?.setValidators([Validators.required]);
      this.historyForm.get('toDate')?.setValidators([Validators.required]);
    } else {
      this.customDate = false;
      this.historyForm.get('fromDate')?.clearValidators();
      this.historyForm.get('toDate')?.clearValidators();
    }
    this.historyForm.get('fromDate')?.updateValueAndValidity();
    this.historyForm.get('toDate')?.updateValueAndValidity();
  }

  getSelectedValues(data: any) {
    if (!Array.isArray(data)) {
      return { value: data?.value, text: data?.text };
    }
    return {
      value: data.map((item: any) => item.value).join(','),
      text: data.map((item: any) => item.text).join(',')
    };
  }

  historySubmit(e:any, formvalue:any) {
    e.preventDefault();
    if (this.historyForm.invalid) {
      this.historyForm.markAllAsTouched();
      return;
    }
    let userData = formvalue?.user ? this.getSelectedValues(formvalue?.user) : { value: null, text: null };
    let payload = {
      "userId": userData?.value,
      "fromDate": formvalue?.fromDate,
      "toDate": formvalue?.toDate
    }

    this.historyService.updateHistoryData(null); 
    this.historyService.historyData(payload).subscribe((res:any)=>{
      this.historyList = res?.body?.result || [];
      this.historyService.updateHistoryData(this.historyList);
    })
  }

  cancel() {
    this.historyForm.reset();
    this.historyForm.get('timeformat')?.setValue('Today');
    this.historyService.updateHistoryData([]);
  }
}
