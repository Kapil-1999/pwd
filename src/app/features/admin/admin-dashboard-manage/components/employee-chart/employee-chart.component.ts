import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrls: ['./employee-chart.component.scss']
})
export class EmployeeChartComponent {
  @Input() dashboardData: any;
  @Input() isChartLoding: boolean | any;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: any = ['CE', 'SE', 'EE', 'AE', 'JE'];
  barChartType: string = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: any = [
    {
      data: [0, 0, 0, 0, 0], label: 'Present', stack: 'a',  backgroundColor: 'rgba(1, 150, 160, 0.89)', hoverBackgroundColor : 'rgba(1, 150, 160, 0.89)',     
    },
    {
      data: [0, 0, 0, 0, 0], label: 'Absent', stack: 'a', backgroundColor: 'rgba(204, 41, 76, 0.96)',hoverBackgroundColor : 'rgba(204, 41, 76, 0.96)',
    },
  ];

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartLabels = ['CE', 'SE', 'EE', 'AE', 'JE'];
  public pieChartDatasets = [{
    data: [0, 0, 0, 0, 0],
    backgroundColor: [
      'rgb(10, 160, 160)', 
      'rgba(228, 9, 9, 0.6)', 
      'rgba(214, 159, 19, 0.6)',
      'rgba(31, 5, 179, 0.6)',  
      'rgba(75, 15, 195, 0.6)'  
    ],
    hoverBackgroundColor: [
      'rgb(10, 160, 160)', 
      'rgba(228, 9, 9, 0.6)', 
      'rgba(214, 159, 19, 0.6)',
      'rgba(31, 5, 179, 0.6)',  
      'rgba(75, 15, 195, 0.6)'
    ],
  }];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashboardData'] && changes['dashboardData'].currentValue) {
      this.updateChartDatas(this.dashboardData);
    }
  }

  updateChartDatas(incomingData: any) {
    if (incomingData) {
      this.barChartData[1].data = [
        incomingData.ce_count - incomingData.ce_present_count,
        incomingData.se_count - incomingData.se_present_count,
        incomingData.ee_count - incomingData.ee_present_count,
        incomingData.ae_count - incomingData.ae_present_count,
        incomingData.je_count - incomingData.je_present_count
      ];

      this.barChartData[0].data = [
        incomingData.ce_present_count,
        incomingData.se_present_count,
        incomingData.ee_present_count,
        incomingData.ae_present_count,
        incomingData.je_present_count
      ];

      this.pieChartDatasets[0].data = [
        incomingData.ce_count,
        incomingData.se_count,
        incomingData.ee_count,
        incomingData.ae_count,
        incomingData.je_count
      ];
    }
  }

  getTotalSum() {
    let sum = 0;
    this.barChartData[0].data?.forEach((element: any) => sum += element);
    return sum;
  }

  getTotalUpsentSum() {
    let sum = 0;
    this.barChartData[1].data?.forEach((element: any) => sum += element);
    return sum;
  }


  getTotalUserSum() {
    let sum = 0;
    this.pieChartDatasets[0].data?.forEach((element: any) => sum += element);
    return sum;
  }
}
