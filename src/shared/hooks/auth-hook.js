import { useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";

dayjs.extend(utc);
let logoutTimer;

export const useAuth = () => {
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();
  const [tokenExpiration, setTokenExpiration] = useState();

  const login = useCallback((userId, token, expireDate) => {
    setUserId(userId);
    setToken(token);
    setTokenExpiration(expireDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId, token, expireDate })
    );
  }, []);
  const logout = useCallback(() => {
    setUserId(null);
    setToken(false);
    setTokenExpiration(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpiration) {
      const expireDate = dayjs.utc(tokenExpiration);
      const now = dayjs.utc();
      const timeToLive = expireDate.diff(now);
      logoutTimer = setTimeout(logout, timeToLive);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpiration]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
      return;
    }
    const { token, userId, expireDate } = userData;
    if (!token || !userId || !expireDate) {
      return;
    }
    const expired = dayjs.utc(expireDate);
    const now = dayjs.utc();
    if (expired > now) {
      login(userId, token, expireDate);
    } else {
      logout();
    }
  }, [login, logout]);

  return { token, userId, login, logout };
};
