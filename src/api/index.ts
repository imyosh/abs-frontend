import axios from "axios";

export const BASE_URL = "https://abs-backend.hhoon5511.workers.dev/api";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // Important for CORS with credentials
});

export async function apiLogout() {
  const res = await apiClient.post("/auth/logout");
  return res.data;
}

export async function apiGetUser() {
  try {
    const res = await apiClient.get<{ user: User }>("/auth/me");
    return res.data.user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function apiGetUserReservations() {
  const res = await apiClient.get<ParkingSpot[]>("/my-spots");
  return res.data;
}

export async function apiReserve() {
  const res = await apiClient.post<{ reservationCode: string }>("/reserve");
  return res.data;
}

export async function apiCancelReserve(reservationCode: string) {
  const res = await apiClient.post<{ success: true }>("/cancel", {
    reservationCode,
  });
  return res.data;
}

export async function apiCheckAvailability() {
  try {
    const res = await apiClient.get<{ availableSpots: number }>(
      "/availability"
    );
    return res.data;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong!",
    };
  }
}

export default apiClient;
