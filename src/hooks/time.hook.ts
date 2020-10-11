import { useEffect, useReducer } from "react";
import { timeService } from "../services/time.service";
import { useToken } from "../services/login.service";

export interface TimeState {
  time?: string;
  authFailed: boolean;
  isLoading: boolean;
}

const initialTimeState: TimeState = {
  authFailed: false,
  isLoading: true,
};

export interface TimeAction {
  type: string;
  payload?: Partial<TimeState>;
}

function timeReducer(state: TimeState, action: TimeAction) {
  console.log(state, action);
  switch (action.type) {
    case "authFailed": {
      return { ...state, authFailed: true };
    }
    case "isLoading": {
      return { ...state, isLoading: true };
    }
    case "timeUpdate": {
      return {
        ...state,
        isLoading: false,
        time: action.payload?.time,
      };
    }
    default:
      return { ...state, ...action.payload };
  }
}

export function useTime(): TimeState {
  console.log("useTime called");
  const [state, dispatch] = useReducer(timeReducer, initialTimeState);
  const token = useToken();

  useEffect(() => {
    console.log(
      `useTime effect called, timeService.isStarted=${timeService.isStarted}`
    );

    if (!timeService.isStarted && token) {
      timeService.start(token, dispatch);
    }
    return () => {
      console.log("useTime effect CLEANUP called");
      timeService.stop();
    };
  }, [token, dispatch]);

  return state;
}
