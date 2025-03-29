import { createSelector } from "@ngrx/store";

export const selectAppstate = (state :any) => state.app;
export const  allvehicleData = createSelector(selectAppstate ,(state) => state.vehicleData);
export const  setTypeUserOnMap =  createSelector(selectAppstate ,(state) => state.typeUser);
export const  setSelectedVehicleData = createSelector(selectAppstate ,(state) => state.selectedVehicle);
export const  setUserCountData = createSelector(selectAppstate,(state) => state.userCountData);
export const  setIsShowUserList = createSelector(selectAppstate,(state) => state.showUserList);
export const  setSelectedUser = createSelector(selectAppstate,(state) => state.selectedUser);
export const setSelectedUserArea = createSelector(selectAppstate,(state) => state.selectedUserArea);

