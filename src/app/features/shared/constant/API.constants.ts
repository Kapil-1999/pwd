export const API_CONSTANTS = {
    login: 'Auth/Login',
    zoneList: 'Zone',
    stateList: 'Common/GetStateList',
    updateZone: 'Zone/{zoneId}',
    circle: 'Circle',
    deleteUpdateCircle: 'Circle/{circleId}',
    department: 'Common/GetDepartmentList',
    stateBasedZone: 'Common/GetZoneList?stateId={stateId}',
    zoneBasedCircle: 'Common/GetCircleList?zoneId={zoneId}',
    circleBasedcity: 'Common/GetDistrictList?circleId={circleId}',
    cityBasedDivision: 'Common/GetDivisionList?districtId={cityId}',
    designation: 'Common/GetDesignationList',
    usertype: 'Common/GetUserTypeList',
    district: 'District',
    updateDeleteDist: 'District/{distId}',
    user: 'User',
    chiefEngList: "Common/GetChiefEngList",
    sEngList: 'Common/GetSupritendingEngList?chiefEngId={chiefEngId}',
    eeList: "Common/GetExecutiveEngList?supEngId={supEngId}",
    aeList: "Common/GetAssistantEngList?execEngId={execEngId}",
    jeList: "Common/GetJuniorEngList?assEngId={assEngId}",
     getDivisionDetails : 'Division?pageNo={pageNo}&pageSize={pageSize}',
    createDivision : 'Division',
    updateDivision : 'Division/{divisionId}'


}