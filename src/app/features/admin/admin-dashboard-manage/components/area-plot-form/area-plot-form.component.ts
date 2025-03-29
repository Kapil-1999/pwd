import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-area-plot-form',
  templateUrl: './area-plot-form.component.html',
  styleUrl: './area-plot-form.component.scss'
})
export class AreaPlotFormComponent {
  formCode: string | any;
  catId: string | any;
  subCat: string | any;
  taskDetId: string | any;
  areaPlotForm: any;
  constructor(
    private route: ActivatedRoute,
    private dashboardService : DashboardService
  ) {
    this.route.paramMap.subscribe(params => {
      this.formCode = params.get('formCode');
    });

    this.route.queryParamMap.subscribe(queryParams => {
      this.catId = queryParams.get('cat');
      this.subCat = queryParams.get('subCat');
      this.taskDetId = queryParams.get('task');
      this.getFormData()

    });
  }



  showForm(formNumber: number): boolean {
    return parseInt(this.formCode) === formNumber;
  }

  isFormAvailable(): boolean {
    const availableForms = [1, 2, 3, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 21, 22, 24, 25];
    return availableForms.includes(parseInt(this.formCode));
  }

  getFormData() {
    const data = {
      taskId: this.catId,
      taskDetId: this.taskDetId 
    };
    
    let service: any;
    
    switch(this.formCode) {
      case '1':
        service = this.dashboardService.form1Data(data);
        break;
      case '02':
        service = this.dashboardService.form2Data(data);
        break;
      case '03':
        service = this.dashboardService.form3Data(data);
        break;
      default:
        console.log('Form code not handled:', this.formCode);
        return;
    }
    service.subscribe({
      next: (res: any) => {
        this.areaPlotForm = res?.body?.result || [];
      },
      error: (err: any) => {
        console.error('Error fetching form data:', err);
      }
    });
}
}
