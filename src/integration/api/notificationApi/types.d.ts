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

interface UpdateDoughBallNotificationdata {
  message: string;
}

interface UpdateDoughBallNotificationErrorData {
  statusCode: number;
  error: string;
  message: string;
}
interface UpdateDoughBallNotificationError {
  data: UpdateDoughBallNotificationErrorData;
  status: number;
}

export interface UpdateDoughBallNotificationResponse {
  data?: UpdateDoughBallNotificationdata;
  error?: UpdateDoughBallNotificationError;
  status?: number;
}

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
