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
  isLoading: boolean = false;
  rows = Array.from({ length: 30 }, (_, i) => i + 1);
  constructor(
    private route: ActivatedRoute,
    private dashboardService: DashboardService
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
    const availableForms = [1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 18, 20, 21, 22, 23, 24, 25];
    return availableForms.includes(parseInt(this.formCode));
  }

  getFormData() {
    this.isLoading = true;
    const data = {
      taskId: this.catId,
      taskDetId: this.taskDetId
    };

    let service: any;

    switch (this.formCode) {
      case '01':
        service = this.dashboardService.form1Data(data);
        break;
      case '02':
        service = this.dashboardService.form2Data(data);
        break;
      case '03':
        service = this.dashboardService.form3Data(data);
        break;
      case '04':
        service = this.dashboardService.form4Data(data);
        break;
      case '05':
        service = this.dashboardService.form5Data(data);
        break;
      case '06':
        service = this.dashboardService.form6Data(data);
        break;
      case '07':
        service = this.dashboardService.form7Data(data);
        break;
      case '08':
        service = this.dashboardService.form8Data(data);
        break;
      case '09':
        service = this.dashboardService.form9Data(data);
        break;
      case '10':
        service = this.dashboardService.form10Data(data);
        break;
      case '11':
        service = this.dashboardService.form11Data(data);
        break;
      case '12':
        service = this.dashboardService.form12Data(data);
        break;
      case '13':
        service = this.dashboardService.form13Data(data);
        break;
      case '14':
        service = this.dashboardService.form14Data(data);
        break;
      case '15':
        service = this.dashboardService.form15Data(data);
        break;
      case '16':
        service = this.dashboardService.form16Data(data);
        break;
      case '17':
        service = this.dashboardService.form17Data(data);
        break;
      case '18':
        service = this.dashboardService.form18Data(data);
        break;
      case '19':
        service = this.dashboardService.form19Data(data);
        break;
      case '20':
        service = this.dashboardService.form20Data(data);
        break;
      case '21':
        service = this.dashboardService.form21Data(data);
        break;
      case '22':
        service = this.dashboardService.form22Data(data);
        break;
      case '23':
        service = this.dashboardService.form23Data(data);
        break;
      case '24':
        service = this.dashboardService.form24Data(data);
        break;
      case '25':
        service = this.dashboardService.form25Data(data);
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
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
