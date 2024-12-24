declare const jQuery: any;
export function smoothlyMenu() {
    jQuery('.navbar').toggleClass('active');
    jQuery('.userInfo').toggleClass('playerInfo'); 
    jQuery('.userInfo').toggleClass('infoDiv'); 
}

export function getYrsOld(dob: any) {
  let currentDate = new Date();
  let dobDate = new Date(dob.year, dob.month, dob.day);
  /*console.log('currentDate', currentDate);
  console.log('dobDate', dobDate);*/
  var diff = Math.floor(currentDate.getTime() - dobDate.getTime());
  var day = 1000 * 60 * 60 * 24;

  var days = Math.floor(diff/day);
  var months = Math.floor(days/31);
  var years = Math.floor(months/12);
  //console.log('years', years);
  return years+1;
}

export function checkStatus(data: any) {
    let labelStatus = '';
    /*Start Date Time*/
    const yy = new Date(data.startDate).getFullYear();
    const mm = new Date(data.startDate).getMonth();
    const dd = new Date(data.startDate).getDate();
    let times = data.startTime.split(" ")[0].split(":");
    if(data.startTime.split(" ")[1]=="PM")times[0]=Number(times[0])+12;
    const completeStartDate = new Date(yy, mm, dd, times[0], times[1]);
    /*End Date Time*/
    const yyE = new Date(data.endDate).getFullYear();
    const mmE = new Date(data.endDate).getMonth();
    const ddE = new Date(data.endDate).getDate();
    let timesE = data.endTime.split(" ")[0].split(":");
    if(data.endTime.split(" ")[1]=="PM")timesE[0]=Number(timesE[0])+12;
    const completeEndDate = new Date(yyE, mmE, ddE, timesE[0], timesE[1]);

    if(((new Date().valueOf()) >= (new Date(completeStartDate).valueOf())) && 
      ((new Date().valueOf()) < (new Date(completeEndDate).valueOf())) && data.isCancelled == false)
    {
      labelStatus = 'ongoing';
    }
    else if(((new Date(completeStartDate).valueOf()) > (new Date().valueOf())) &&
      ((new Date(completeStartDate).valueOf()) > (new Date().valueOf())) && data.isCancelled == false)
    {
      labelStatus = 'upcoming';
    }
    else if(((new Date().valueOf()) > (new Date(completeStartDate).valueOf())) && 
      ((new Date().valueOf()) > (new Date(completeEndDate).valueOf())) && data.isCancelled == false)
    {
      labelStatus = 'ended';
    }
    else if(data.isCancelled == true) 
    {
      labelStatus = 'cancelled';
    }
    return labelStatus;
}

export function getDateInMillis(selectedDate: any) {
  const yy = new Date(selectedDate).getFullYear();
  const mm = new Date(selectedDate).getMonth();
  const dd = new Date(selectedDate).getDate();
  const completeDate = new Date(yy+'/'+mm+'/'+dd);
  return completeDate.getTime();
}

export function getDateTimeInMillis(selectedDate: any, selectedTime: any) {
  let times = selectedTime.split(":");
  if(selectedTime.split(" ")[1]=="PM")times[0]=Number(times[0])+12;
  const yy = new Date(selectedDate).getFullYear();
  const mm = new Date(selectedDate).getMonth();
  const dd = new Date(selectedDate).getDate();
  const completeDate = new Date(yy+'/'+mm+'/'+dd+' '+selectedTime);
  return completeDate.getTime();
}

