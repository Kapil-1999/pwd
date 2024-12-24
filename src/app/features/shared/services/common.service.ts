import { Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';
// import { ApiService } from '../../http-services/api.service';
// import { API_CONSTANTS } from '../constant/API.Constants';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
   countryListCache$!: Observable<any>;
   stateListCache$!: Observable<any>;
   cityListCache$!: Observable<any>;
   companyListCache$!: Observable<any>;
   userListCache$!: Observable<any>
   resourceGroupListCache$!: Observable<any>


  constructor(
    // private apiService : ApiService,
    private http : HttpClient
  ) { }

  //**country list service here */
//   countryList(): Observable<any> {
//     let url = API_CONSTANTS.country

//     if (!this.countryListCache$) {
//       this.countryListCache$ = this.apiService.get(url).pipe(
//         shareReplay(1),
//         catchError((error: HttpErrorResponse) => of(error))
//       );
//     }
//     return this.countryListCache$;
//   }

//   //**state list service here */
//   stateList(countryID:any): Observable<any> {
//     let url = API_CONSTANTS.state.replace("{countryID}", countryID)

//       this.stateListCache$ = this.apiService.get(url).pipe(
//         shareReplay(1),
//         catchError((error: HttpErrorResponse) => of(error))
//       );
    
//     return this.stateListCache$;
//   }


//   cityList(countryID: any, stateID: any): Observable<any> {
//     let url = API_CONSTANTS.city.replace("{countryID}", countryID).replace('{stateID}', stateID);

//     this.cityListCache$ = this.apiService.get(url).pipe(
//       shareReplay(1),
//       catchError((error: HttpErrorResponse) => of(error))
//     );
    
//     return this.cityListCache$;
// }


//   //**company list service here */
//   companyList(userID:any): Observable<any> {
//     let url = API_CONSTANTS.company.replace("{userID}",userID)

//     if (!this.companyListCache$) {
//       this.companyListCache$ = this.apiService.get(url).pipe(
//         shareReplay(1),
//         catchError((error: HttpErrorResponse) => of(error))
//       );
//     }
//     return this.companyListCache$;
//   }

//    //**Resource Group list service here */
//    resourceGroupList(): Observable<any> {
//     let url = API_CONSTANTS.resourceGroupList

//     if (!this.resourceGroupListCache$) {
//       this.resourceGroupListCache$ = this.apiService.get(url).pipe(
//         shareReplay(1),
//         catchError((error: HttpErrorResponse) => of(error))
//       );
//     }
//     return this.resourceGroupListCache$;
//   }

//   //**company Dropdown service here */
//   companyDropdownList(): Observable<any> {
//     let url = API_CONSTANTS.companyDropdown
//     return this.apiService
//       .getData(url)
//       .pipe(catchError((error: HttpErrorResponse) => of(error)));
//   }

//    //**Role Dropdown service here */
//   roleDropdownList(): Observable<any> {
//     let url = API_CONSTANTS.roleMasterDropdownList
//     return this.apiService
//       .getData(url)
//       .pipe(catchError((error: HttpErrorResponse) => of(error)));
//   }

//    //**Parent Resource Dropdown service here */
//   parentResourceDropdownList(): Observable<any> {
//     let url = API_CONSTANTS.parentResourceDropdown
//     return this.apiService
//       .getData(url)
//       .pipe(catchError((error: HttpErrorResponse) => of(error)));
//   }

//    //**Vehicle Type Dropdown service here */
//    vehicleTypeDrropdown(): Observable<any> {
//     let url = API_CONSTANTS.vehicleTypeDropdown
//     return this.apiService
//       .getData(url)
//       .pipe(catchError((error: HttpErrorResponse) => of(error)));
//   }

//    //**Vehicle Type Dropdown service here */
//    userDropdown(): Observable<any> {
//     let url = API_CONSTANTS.userDropdown
//     return this.apiService
//       .getData(url)
//       .pipe(catchError((error: HttpErrorResponse) => of(error)));
//   }

//   deviceType(): Observable<any> {
//     let url = API_CONSTANTS.deviceType
//     return this.apiService
//       .getData(url)
//       .pipe(catchError((error: HttpErrorResponse) => of(error)));
//   }

//   vehicleType(): Observable<any> {
//     let url = API_CONSTANTS.vehicleType
//     return this.apiService
//       .getData(url)
//       .pipe(catchError((error: HttpErrorResponse) => of(error)));
//   }

//   locationDetails(): Observable<any> {
//     let url = API_CONSTANTS.locationDetails
//     return this.apiService
//       .getData(url)
//       .pipe(catchError((error: HttpErrorResponse) => of(error)));
//   }

//   formatTimeValue(time: any) {
//     if (typeof time === 'undefined' || time === null) {
//       return "00hr, 00min, 00sec";
//     } 
//     const [days, timming] = time?.split(".");
//     const newTime = timming.split(':');
//     let formattedTime = '';
  
//     if (parseInt(days) !== 0) {
//       const day = Math.floor(parseInt(days) / 24);
//       formattedTime += `${days}days, `;
//     }
  
//     if (parseInt(newTime[0]) !== 0) {
//       formattedTime += `${newTime[0]}hr, `;
//     }
  
//     if (parseInt(newTime[1]) !== 0) {
//       formattedTime += `${newTime[1]}min, `;
//     }
  
//     formattedTime += `${newTime[2]}sec`;
  
//     return formattedTime;
//   }

//   onCheckVehicleDevice(device: any) {
//     if (device?.Device?.VehicleType == 1) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_car_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_car_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_car_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_car_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 2) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_bus_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_bus_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_bus_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_bus_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 3) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_truck_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_truck_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_truck_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_truck_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 4) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_bike_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_bike_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_bike_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_bike_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 5) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_jcb_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_jcb_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_jcb_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_jcb_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 6) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_lifter_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_lifter_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_lifter_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_lifter_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 7) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_loader_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_loader_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_loader_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_loader_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 8) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_marker_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_marker_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_marker_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_marker_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 9) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_person_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_person_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_person_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_person_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 10) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_pet_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_pet_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_pet_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_pet_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 11) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_ship_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_ship_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_ship_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_ship_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 12) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_tanker_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_tanker_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_tanker_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_tanker_gray.png';
//       }
//     } else if (device?.Device?.VehicleType == 13) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/geen_taxi_f.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/blue_taxi_f.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/yellow_taxi_f.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/gray_taxi_f.png';
//       }
//     } else if (device?.Device?.VehicleType == 14) {
//       if (device?.Status === 1 && device?.SubStatus === 1) {
//         return 'assets/drawable/rp_marker_tractor_green.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 2) {
//         return 'assets/drawable/rp_marker_tractor_blue.png';
//       } else if (device?.Status === 1 && device?.SubStatus === 3) {
//         return 'assets/drawable/rp_marker_tractor_yellow.png';
//       } else if (device?.Status === 0) {
//         return 'assets/drawable/rp_marker_tractor_gray.png';
//       }
//     }
//     return 'NA';
//   }

//   vehicleList(): Observable<any> {
//     let url = 'https://itmparampara.co.in/api/VehicleList'
//     return this.http
//       .get(url)
//       .pipe(catchError((error: HttpErrorResponse) => of(error)));
//   }

}
