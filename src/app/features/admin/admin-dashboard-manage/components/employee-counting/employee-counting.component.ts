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
    { count: 0, name: 'Chief Engineer', status: 'offline', icon: 'assets/images/user.png', key: 'ce_count', ce_desig_id: 0, user_id : 0 },
    { count: 0, name: 'Supritending Engineer',status: 'online', icon: 'assets/images/user.png', key: 'se_count', ce_desig_id: 0,user_id : 0   },
    { count: 0, name: 'Ex. Engineer',status: 'stopped', icon: 'assets/images/user.png', key: 'ee_count',ce_desig_id: 0,user_id : 0 },
    { count: 0, name: 'AE',status: 'idle', icon: 'assets/images/user.png', key: 'ae_count', ce_desig_id: 0,user_id : 0 },
    { count: 0, name: 'JE',status: 'offline', icon: 'assets/images/user.png', key: 'je_count', ce_desig_id: 0,user_id : 0 },
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
      this.cards = this.cards.map((card: any) => {
        const updatedCount = this.dashboardData[card.key] || 0;
          const updatedUserId = this.dashboardData.user_id || 0;
          let updatedDesigId = 0;
        switch (card.key) {
          case 'ce_count':
            updatedDesigId = this.dashboardData.ce_desig_id || 0;
            break;
          case 'se_count':
            updatedDesigId = this.dashboardData.se_desig_id || 0;
            break;
          case 'ee_count':
            updatedDesigId = this.dashboardData.ee_desig_id || 0;
            break;
          case 'ae_count':
            updatedDesigId = this.dashboardData.ae_desig_id || 0;
            break;
          case 'je_count':
            updatedDesigId = this.dashboardData.je_desig_id || 0;
            break;
          default:
            updatedDesigId = 0;
        }
          return {
          ...card,
          count: updatedCount,
          user_id: updatedUserId,
          ce_desig_id: updatedDesigId
        };
      });
    }
  }

  goToDetails(data:any) {
    this.router.navigateByUrl('/admin/dashboard/user-details', {
      state: { userData: data }
    });
  }
}
