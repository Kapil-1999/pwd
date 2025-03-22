import { createAction , props } from "@ngrx/store";

export const setvehicleData = createAction('[vehicle] setvehicleData', props<{vehicleData: any}>());
export const setTypeUser = createAction('[vehicle] setTypeUser', props<{typeUser: any}>());
export const selectedVehicleData = createAction('[vehicle] selectedVehicleData', props<{selectedVehicle: any}>());
export const setUserCountData = createAction('[vehicle] setuserCountData', props<{userCountData: any}>());
export const removeVehicle = createAction('[vehicle] removeVehicle');
export const setShowUserList = createAction('[vehicle] showUserList', props<{showUserList: any}>());