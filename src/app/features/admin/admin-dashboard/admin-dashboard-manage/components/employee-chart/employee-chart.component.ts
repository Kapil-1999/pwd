import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-chart',
  templateUrl: './employee-chart.component.html',
  styleUrl: './employee-chart.component.css'
})
export class EmployeeChartComponent {
  chartData = [
    { name: 'Chief Engineer', value: 18 },
    { name: 'Supritending Engineer', value: 34 },
    { name: 'Ex. Engineer', value: 168 },
    { name: 'AE', value: 10 },
    { name: 'JE', value: 8 }
  ];

  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showDataLabel = true;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF5733'] // Custom bar colors
  };
  view: [number, number] = [1420, 400]; // Chart size: width x height


}
