import React, { useCallback, useEffect } from "react";
import { useTime } from "../hooks/time.hook";
import { logout } from "../services/login.service";
import { Link, useHistory } from "react-router-dom";
import { Loader } from "./loader.component";
import "./time.component.scss";

export const Time = () => {
  const state = useTime();
  const history = useHistory();
  const logoutCb = useCallback(logout, []);

  useEffect(() => {
    if (state.authFailed) {
      logout();
      history.push(
        `/login?error=${encodeURIComponent("Не удалось подключиться")}`
      );
    }
  }, [state.authFailed, history]);

  return (
    <div className="time">
      <div>
        {state.isLoading ? <Loader /> : <></>}
        {state.time ? <div>{state.time}</div> : <></>}
      </div>
      <Link to="/login" onClick={logoutCb}>
        Выйти
      </Link>
    </div>
  );
};
