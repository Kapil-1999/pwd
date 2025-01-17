import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../../http-services/api.service';
import { API_CONSTANTS } from '../constant/API.constants';
import { LocalStorageService } from './localstorage.service';
import * as XLSX from 'xlsx';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';



@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(
    private apiService: ApiService,
    private localStorageService : LocalStorageService
  ) { }

  zoneList(stateId: any): Observable<any> {
    let url = API_CONSTANTS.stateBasedZone.replace("{stateId}", stateId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  stateList(): Observable<any> {
    let url = API_CONSTANTS.stateList;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  circleList(zoneId: any): Observable<any> {
    let url = API_CONSTANTS.zoneBasedCircle.replace("{zoneId}", zoneId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  cityList(circleId: any): Observable<any> {
    let url = API_CONSTANTS.circleBasedcity.replace("{circleId}", circleId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  divisionList(cityId: any): Observable<any> {
    let url = API_CONSTANTS.cityBasedDivision.replace("{cityId}", cityId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  departmentList(): Observable<any> {
    let url = API_CONSTANTS.department;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  designationList(): Observable<any> {
    let url = API_CONSTANTS.designation;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  usertypeList(): Observable<any> {
    let url = API_CONSTANTS.usertype;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  chiefEngList(): Observable<any> {
    let url = API_CONSTANTS.chiefEngList;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  supritendingEngList(chiefEngId:any): Observable<any> {
    let url = API_CONSTANTS.sEngList.replace("{chiefEngId}", chiefEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  executiveEngList(supEngId:any): Observable<any> {
    let url = API_CONSTANTS.eeList.replace("{supEngId}", supEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  assistantEngList(execEngId:any): Observable<any> {
    let url = API_CONSTANTS.aeList.replace("{execEngId}", execEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  juniorEngList(assEngId:any): Observable<any> {
    let url = API_CONSTANTS.jeList.replace("{assEngId}", assEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  districtList(): Observable<any> {
    let url = API_CONSTANTS.district;
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  getZoneByChiefEng(chiefEngId: any): Observable<any> {
    const url = API_CONSTANTS.getZoneByChiefEng.replace("{chiefEngId}", chiefEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }
  
  getCircleBySupEng(supEngId: any): Observable<any> {
    const url = API_CONSTANTS.GetCircleBySupEng.replace("{supEngId}", supEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  getDistrictByExecEng(execEngId: any): Observable<any> {
    const url = API_CONSTANTS.GetDistrictByExecEng.replace("{execEngId}", execEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }
  
  getDivisionByAssEng(assEngId: any): Observable<any> {
    const url = API_CONSTANTS.GetDivisionByAssEng.replace("{assEngId}", assEngId);
    return this.apiService.get(url).pipe(
      catchError((error: HttpErrorResponse) => of(error))
    );
  }

  getUserDetails() {
    let user = this.localStorageService.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
  }

  excelService(excelData:any, reportName:any) {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, reportName);
    XLSX.writeFile(wb,  `${reportName}.xlsx`);
  }
  
  copyTable(columns: any, row :any) {
    if (!columns || !row) {
      console.error('Columns or data is missing!');
      return;
    }
    const headerRow = columns.map((column: any) => column.title).join('\t');
    const rows = row;
    const tableText = [headerRow, ...rows].join('\n');
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = tableText;
    tempTextArea.style.position = 'fixed';
    tempTextArea.style.opacity = '0';
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextArea);
  }

  exportToCSV(columns: any, row :any, report:any) {
    if (!columns || !row) {
      console.error('Columns or data is missing!');
      return;
    }
    const headers = columns.map((col: any) => col.title).join(',');    const rows = row;
    const tableText = [headers, ...rows].join('\n');
    const blob = new Blob([tableText], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', report);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  exportToPDF(headers: any, rows :any, report:any) {
    const doc: any = new jsPDF({ orientation: 'portrait', format: 'a4' });
    doc.setFontSize(18);
    doc.text(report, 14, 22);
    const chunkSize = 50;

    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      autoTable(doc, {
        head: [headers],
        body: chunk,
        startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 30,
        tableWidth: 'auto',
        margin: { top: 20, right: 5, bottom: 20, left: 5 },
        styles: {
          fontSize: 7,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [59, 130, 246],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
        },
        theme: 'striped',
        pageBreak: 'auto',
      });
    }

    doc.save(`${report}.pdf`);
  }


}
