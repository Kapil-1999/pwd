import { createAction , props } from "@ngrx/store";

export const setvehicleData = createAction('[vehicle] setvehicleData', props<{vehicleData: any}>());
export const setTypeUser = createAction('[vehicle] setTypeUser', props<{typeUser: any}>());
export const selectedVehicleData = createAction('[vehicle] selectedVehicleData', props<{selectedVehicle: any}>());
export const setUserCountData = createAction('[vehicle] setuserCountData', props<{userCountData: any}>());
export const setShowUserList = createAction('[vehicle] showUserList', props<{showUserList: any}>());
export const selectedUser = createAction('[vehicle] selectedUser', props<{selectedUser: any}>());
export const selectedUserArea = createAction('[vehicle] selectedUserArea', props<{selectedUserArea: any}>());
export const selectProfile = createAction('[vehicle] selectProfile', props<{selectProfile: any}>());