import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'general-filter-report',
  templateUrl: './general-filter-report.component.html',
  styleUrl: './general-filter-report.component.scss'
})
export class GeneralFilterReportComponent {
  selectDate = [
    { id: 'Today', dateValue: 'Today' },
    { id: 'Yesterday', dateValue: 'Yesterday' },
    { id: 'Weekly', dateValue: 'Weekly' },
    { id: 'Last 30 Days', dateValue: 'Last 30 Days' },
    { id: 'Custom', dateValue: 'Custom' }
  ];

  selectType = [
    { id: 'Chief Engineer', dateValue: 'Chief Engineer' },
    { id: 'Ex Engineer', dateValue: 'Ex Engineer' },
    { id: 'AE', dateValue: 'AE' },
    { id: 'Je', dateValue: 'Je' },
  ]
  customDate: boolean = false;
  generalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.setInitialForm()
  }

  setInitialForm() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0);

    const todayEnd = new Date(todayStart);
    todayEnd.setHours(23, 59, 59);

    this.generalForm = this.fb.group({
      type: ['Chief Engineer', [Validators.required]],
      timeformat: ['Today', [Validators.required]],
      fromDate: [this.formatDateForInput(todayStart)],
      toDate: [this.formatDateForInput(todayEnd)],
    });

    this.generalForm.get('timeformat')?.valueChanges.subscribe((value) => {
      let newFromDate = new Date(todayStart);
      let newToDate = new Date(todayEnd);

      if (value === 'Custom') {
        this.generalForm.get('fromDate')?.setValue(this.formatDateForInput(todayStart));
        this.generalForm.get('toDate')?.setValue(this.formatDateForInput(todayEnd));
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
        this.generalForm.get('fromDate')?.setValue(this.formatDateForInput(newFromDate));
        this.generalForm.get('toDate')?.setValue(this.formatDateForInput(newToDate));
      }
    });
  }

  formatDateForInput(date: Date) {
    return this.datepipe.transform(date, 'yyyy-MM-ddTHH:mm:ss');
  }

  timecheck(event: any) {
    if (event.target.value === "Custom") {
      this.customDate = true;
    } else {
      this.customDate = false;
    }
  }
}
