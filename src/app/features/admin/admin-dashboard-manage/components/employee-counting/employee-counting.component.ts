import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-counting',
  templateUrl: './employee-counting.component.html',
  styleUrl: './employee-counting.component.scss'
})
export class EmployeeCountingComponent {
  @Input() dashboardData :any;

  cards = [
    { count: 0, name: 'Chief Engineer', status: 'offline', icon: 'assets/images/no-image.png', key: 'ce_count', ce_desig_id: 0, user_id : 0 },
    { count: 0, name: 'Supritending Engineer',status: 'online', icon: 'assets/images/no-image.png', key: 'se_count', se_desig_id: 0,user_id : 0   },
    { count: 0, name: 'Ex. Engineer',status: 'stopped', icon: 'assets/images/no-image.png', key: 'ee_count',se_desig_id: 0,user_id : 0 },
    { count: 0, name: 'AE',status: 'idle', icon: 'assets/images/no-image.png', key: 'ae_count', se_desig_id: 0,user_id : 0 },
    { count: 0, name: 'JE',status: 'offline', icon: 'assets/images/no-image.png', key: 'je_count', se_desig_id: 0,user_id : 0 },
  ];
  type = 'JE'

  constructor(
    private router : Router
  ){}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashboardData'] && changes['dashboardData'].currentValue) {
      this.updateCardCounts();
    }
  }

  updateCardCounts(): void {
    if (this.dashboardData) {
      this.cards = this.cards.map((card:any) => {        
        const updatedCount = this.dashboardData[card.key] || 0;
        return { ...card, count: updatedCount };
      });
    }
  }

  goToDetails(data:any) {
    console.log("check data",data);
    return
    
    this.router.navigateByUrl('/admin/dashboard/user-details')
    if(data.name == "JE") {
      this.router.navigateByUrl('/admin/dashboard/area-allot-details')
    }
  }
}
