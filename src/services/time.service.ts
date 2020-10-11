import { TOKEN_HEADER } from "./login.service";
import { Dispatch } from "react";
import { TimeAction } from "../hooks/time.hook";

function formatDateTime(time: number) {
  const date = new Date(time * 1000);
  const dd = new Intl.DateTimeFormat("default", { day: "2-digit" }).format(
    date
  );
  const MM = new Intl.DateTimeFormat("default", { month: "2-digit" }).format(
    date
  );
  const yy = new Intl.DateTimeFormat("default", { year: "2-digit" }).format(
    date
  );
  const hh = new Intl.DateTimeFormat("default", {
    hour: "2-digit",
    hour12: false,
  }).format(date);
  const mm =
    "00" +
    new Intl.DateTimeFormat("default", { minute: "2-digit" }).format(date);
  const ss =
    "00" +
    new Intl.DateTimeFormat("default", { second: "2-digit" }).format(date);
  return `${dd}.${MM}.${yy} ${hh}:${mm.substr(mm.length - 2)}:${ss.substr(
    ss.length - 2
  )}`;
}
class TimeService {
  private dispatch?: Dispatch<TimeAction>;
  private _isStarted = false;
  private wsUrl?: string;
  private ws?: WebSocket;
  private token?: string;

  async start(token: string, dispatch: Dispatch<TimeAction>) {
    this.token = token;
    this.dispatch = dispatch;

    if (this._isStarted) {
      return;
    }

    this._isStarted = true;

    try {
      while (this._isStarted) {
        this.dispatch?.({ type: "isLoading" });

        await this.subscribe();

        await this.listen();

        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    } catch (e) {
      console.error(e);
      this.dispatch({ type: "authFailed" });
    }
    this.stop();
  }

  get isStarted(): boolean {
    return this._isStarted;
  }

  stop() {
    this._isStarted = false;
    this.ws?.close();
  }

  private async subscribe() {
    if (!this.token) {
      // eslint-disable-next-line no-throw-literal
      throw { code: "NO_TOKEN", description: "Пользователь не авторизован" };
    }
    const res = await fetch("/api/subscribe", {
      headers: { [TOKEN_HEADER]: this.token },
    }).catch((e) => e);

    if (res.status === 200) {
      this.wsUrl = (await res.json()).url;
    } else {
      throw await res.json();
    }
  }

  private async listen() {
    return new Promise((resolve) => {
      if (!this.wsUrl) {
        return;
      }

      this.ws = new WebSocket(this.wsUrl);
      this.ws.onopen = () => {};
      this.ws.onmessage = (message) => {
        console.log(message);

        const time = formatDateTime(JSON.parse(message.data)?.server_time);
        this.dispatch?.({ type: "timeUpdate", payload: { time } });
      };
      this.ws.onerror = (e) => {
        console.log("this.ws.onerror", e);
        resolve();
      };
      this.ws.onclose = () => {
        console.log("this.ws.onclose");
        resolve();
      };
    });
  }

  setDispatch(dispatch: Dispatch<TimeAction>) {
    this.dispatch = dispatch;
  }
}

export const timeService = new TimeService();
