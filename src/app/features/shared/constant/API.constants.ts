export const API_CONSTANTS = {
    login : 'Auth/Login',
    zoneList : 'Zone',
    stateList :'Common/GetStateList',
    updateZone: 'Zone/{zoneId}',
    circle : 'Circle',
    deleteUpdateCircle : 'Circle/{circleId}',
    department :'Common/GetDepartmentList',
    stateBasedZone : 'Common/GetZoneList?stateId={stateId}',
    zoneBasedCircle : 'Common/GetCircleList?zoneId={zoneId}',
    circleBasedcity: 'Common/GetDistrictList?circleId={circleId}',
    cityBasedDivision:'Common/GetDivisionList?districtId={cityId}',
    designation: 'Common/GetDesignationList',
    usertype :'Common/GetUserTypeList',
    district : 'District',
    updateDeleteDist : 'District/{distId}'


}