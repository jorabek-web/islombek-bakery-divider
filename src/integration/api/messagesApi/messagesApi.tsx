import { baseApi } from "../baseApi";
import { PATHS } from "./paths";
import {
  GetAllMessagesResponse,
  GetMessageRequest,
  GetMessageResponse,
  PostMessageRequest,
  PostMessageResponse,
  ReadMessageRequest,
  ReadMessageResponse,
} from "./types";

export const messagesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllMessages: builder.query<
      GetAllMessagesResponse,
      unknown
    >({
      query: () => ({
        url: PATHS.MESSAGE,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    getMessage: builder.query<GetMessageResponse, GetMessageRequest>({
      query: (id) => ({
        url: `${PATHS.MESSAGE}${id}`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
    postMessage: builder.mutation<PostMessageResponse, PostMessageRequest>({
      query: (body) => ({
        url: PATHS.ADD,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["message"],
    }),
    readMessage: builder.mutation<ReadMessageResponse, ReadMessageRequest>({
      query: ({ idUser, idMsg }) => ({
        url: `${PATHS.READ}${idUser}/${idMsg}`,
        method: "PATCH",
      }),
      invalidatesTags: ["message"],
    }),
  }),
});

export const {
  useGetAllMessagesQuery,
  useGetMessageQuery,
  usePostMessageMutation,
  useReadMessageMutation,
} = messagesApi;
