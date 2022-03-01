import RoomReportModel from "../room/RoomReportModel";
import logger from "../../util/logger";
import { getAdminLoginUrl, getRequestsUrl } from "../URLFactory";
import RoomBookingModel from "../room/RoomBookingModel";

export async function login(username: string, password: string): Promise<boolean> {
  const res = await fetch(getAdminLoginUrl(), {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    logger.info("login request response: " + res.status);
    return false;
  }

  let { token }: { token: string } = await res.json();
  sessionStorage.setItem("token", token);

  console.log(token);

  return true;
}

export async function fetchRequests(type?: "reports" | "bookings" | "all", amount?: number): Promise<(RoomReportModel | RoomBookingModel)[]> {
  let token = sessionStorage.getItem("token");
  if (!token) throw Error("No active session token");

  let req = await fetch(getRequestsUrl(), {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: "bearer " + token,
    },
  });

  let requests = await req.json();

  console.log(requests);

  return requestsToModel(requests);
}

function requestsToModel(requests: any[]) {
  return requests.map((req) => {
    if (req.purpose) return new RoomBookingModel(req);
    return new RoomReportModel(req);
  });
}

export function isLoggedIn(): boolean {
  console.log(sessionStorage.getItem("token"));

  return sessionStorage.getItem("token") ? true : false;
}
