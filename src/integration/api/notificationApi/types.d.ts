import { GetNotificationResponse } from "./types.d";

export interface GetNotificationRequest {
  id: string;
}

export interface GetNotificationResponse {
  _id: string;
  title: string;
  branch: string;
  body: string;
  from: string;
  toUser: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetDoughBallNotificationRequest {
  id: string;
}

export interface GetDoughBallNotificationResponse {
  _id: string;
  doughBallId: string;
  bakerRoomId: string;
  branchId: string;
  count: number;
  oldCount: number;
  workers: string[];
  type: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateDoughBallNotificationRequest {
  id: string;
  status: string;
}


interface UpdateDoughBallNotificationSuccess {
  message: string;
}

interface UpdateDoughBallNotificationError {
  status: number;
  data: {
    statusCode: number;
    error: string;
    message: string;
  };
}

type UpdateDoughBallNotificationResponse =
  | { data: UpdateDoughBallNotificationSuccess; error?: undefined }
  | { data?: undefined; error: UpdateDoughBallNotificationError };

interface NotificationSubscribeRequest {
  endpoint: string;
  keys: {
    auth: string;
    p256dh: string;
  };
}

interface NotificationPushRequest {
  id: string;
  body: {
    title: string;
    body?: string;
  };
}
