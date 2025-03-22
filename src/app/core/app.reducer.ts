import { createReducer, on } from "@ngrx/store";
import { removeVehicle, selectedVehicleData, setShowUserList, setTypeUser, setUserCountData, setvehicleData } from "./app.action";

export interface AppState {
  vehicleData: any;
  typeUser: any;
  selectedVehicle: any;
  userCountData: any;
  showUserList: any;
}

export const initialState: AppState = {
  vehicleData: [],
  typeUser: null,
  selectedVehicle: null, 
  userCountData: [],
  showUserList: true,
}

export const appReducer = createReducer(
    initialState,
    on(setvehicleData, (state, { vehicleData }) => ({
      ...state,
      vehicleData,
    })),
    on(setTypeUser, (state, { typeUser }) => {
      localStorage.setItem('pwd_user', (typeUser))
       return {
        ...state,
        typeUser,
      }
    }),
    on(selectedVehicleData, (state, { selectedVehicle }) => ({
    ...state,
      selectedVehicle,
    })),
    on(removeVehicle, (state) => ({
    ...state,
      selectedVehicle: null,
    })),
    on(setUserCountData, (state, { userCountData }) => ({ 
      ...state,
      userCountData,
    })),
    on(setShowUserList , (state, { showUserList }) => ({
     ...state,
      showUserList,
    }))
)