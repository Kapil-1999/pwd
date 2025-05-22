import { createReducer, on } from "@ngrx/store";
import { selectedUser, selectedUserArea, selectedVehicleData, selectHistoryData, setShowUserList, setTypeUser, setUserCountData, setvehicleData } from "./app.action";

export interface AppState {
  vehicleData: any;
  typeUser: any;
  selectedVehicle: any;
  userCountData: any;
  showUserList: any;
  selectedUser: any;
  selectedUserArea :any;
  historyData :any
}

export const initialState: AppState = {
  vehicleData: [],
  typeUser: null,
  selectedVehicle: null, 
  userCountData: [],
  showUserList: true,
  selectedUser: null,
  selectedUserArea : null,
  historyData : []
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
    on(setUserCountData, (state, { userCountData }) => ({ 
      ...state,
      userCountData,
    })),
    on(setShowUserList , (state, { showUserList }) => ({
     ...state,
      showUserList,
    })),
    on(selectedUser,(state, { selectedUser }) => ({
      ...state,
      selectedUser,
    })),
    on(selectedUserArea,(state, { selectedUserArea }) => ({
     ...state,
      selectedUserArea,
    })),
    on(selectHistoryData ,(state, { historyData }) => ({
    ...state,
      historyData,
    }),
  )
)