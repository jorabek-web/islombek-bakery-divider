import {
  GetDoughBallNotificationRequest,
  GetDoughBallNotificationResponse,
  GetNotificationRequest,
  UpdateDoughBallNotificationRequest,
  UpdateDoughBallNotificationResponse,
} from "./types.d";
import { baseApi } from "../baseApi";
import { PATHS } from "./path";
import { GetNotificationResponse } from "./types";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getNotifications: build.query<
      GetNotificationResponse[],
      GetNotificationRequest
    >({
      query: ({ id }) => ({
        url: PATHS.NOTIFICATIONS_START + id + PATHS.NOTIFICATIONS_END,
        method: "GET",
      }),
      providesTags: ["Notification"],
      // async onCacheEntryAdded(
      //   _,
      //   { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      // ) {
      //   try {
      //     await cacheDataLoaded;
      //     socket.on("notification", (newNotification) => {
      //       updateCachedData((draft) => {
      //         if (Array.isArray(draft)) {
      //           draft.unshift(newNotification);
      //         }
      //       });
      //     });
      //   } catch (error) {
      //     console.error("Socket error:", error);
      //   }
      //   await cacheEntryRemoved;
      //   socket.off("notification");
      // },
    }),
    getNotification: build.query<
      GetNotificationResponse,
      GetNotificationRequest
    >({
      query: ({ id }) => ({
        url: PATHS.NOTIFICATION + id,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    getDoughBallNotifications: build.query<
      GetDoughBallNotificationResponse[],
      unknown
    >({
      query: () => ({
        url: PATHS.DOUGH_BALL_NOTIFICATIONS,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),
    getDoughBallNotification: build.query<
      GetDoughBallNotificationResponse,
      GetDoughBallNotificationRequest
    >({
      query: ({ id }) => ({
        url: PATHS.DOUGH_BALL_NOTIFICATION + id,
        method: "GET",
      }),
      providesTags: ["Notification"],
    }),

    updateDoughBallNotification: build.mutation<
      UpdateDoughBallNotificationResponse,
      UpdateDoughBallNotificationRequest
    >({
      query: ({ id, status }) => ({
        url:
          PATHS.UPDATE_DOUGH_BALL_NOTIFICATION_START +
          id +
          PATHS.UPDATE_DOUGH_BALL_NOTIFICATION_END +
          status,
        method: "PATCH",
      }),
      invalidatesTags: ["Notification"],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetNotificationQuery,
  useGetDoughBallNotificationsQuery,
  useGetDoughBallNotificationQuery,
  useUpdateDoughBallNotificationMutation,
} = notificationApi;
