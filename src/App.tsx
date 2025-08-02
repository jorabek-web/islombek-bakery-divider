import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { PageLayout } from "./layout";
import Login from "./app/auth/login";
import { ParkashXamir, ParkashZuvala, Profile } from "./page-ui";
import { useStorage } from "./utils";
import {
  useNotificationSubscribeMutation,
  useProfileQuery,
} from "./integration";
import { InstallApp } from "./components";

const Home = lazy(() => import("./app/home/home"));
const Notification = lazy(() => import("./app/notification/notification"));
const Complaints = lazy(() => import("./app/complaints/complaints"));
const Message = lazy(() => import("./app/message/message"));
const Chatting = lazy(() => import("./app/chatting/chatting"));

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map((char) => char.charCodeAt(0)));
}

const App = () => {
  const navigate = useNavigate();
  const { isError } = useProfileQuery({});

  const [notificationSubscribe] = useNotificationSubscribeMutation();

  useEffect(() => {
    if (!useStorage.getTokens().accessToken || isError) {
      useStorage.removeCredentials();
      navigate("/");
    } else {
      navigate("/");
      askPermission();
    }
  }, [isError]);

  async function askPermission() {
    const permission = await window.Notification.requestPermission();

    if (permission === "granted") {
      subscribeUser();
    }
  }

  async function subscribeUser() {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.error("Push notifications are not supported in this browser.");
      return;
    }

    const token = useStorage.getTokens().accessToken;

    if (!token) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription =
        await registration.pushManager.getSubscription();

      if (existingSubscription) {
        localStorage.setItem(
          "push-subscribtion",
          JSON.stringify(existingSubscription)
        );
        return;
      }

      const publicVapidKey =
        "BO5UItRTE2roiyFrBjKX2i_O7eHnmpTr9JvFrfk1K2PZuzIW-zvuryK-QnwqDmA0XMVhAK_CzGdr9Rg2Ia48ino";
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });

      await notificationSubscribe(subscription);

      localStorage.setItem("push-subscribtion", JSON.stringify(subscription));
    } catch (error) {
      console.error("Failed to subscribe user:", error);
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Home />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/shikoyatlar" element={<Complaints />} />
          <Route path="/message" element={<Message />} />
          <Route path="/xamir" element={<ParkashXamir />} />
          <Route path="/zuvala" element={<ParkashZuvala />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/message/:id" element={<Chatting />} />
      </Routes>
      <InstallApp />
    </Suspense>
  );
};

export default App;
