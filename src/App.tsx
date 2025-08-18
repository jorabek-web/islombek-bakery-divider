import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PageLayout } from "./layout";
import Login from "./app/auth/login";
import { InstallApp } from "./components";
const Notification = lazy(() => import("./app/notification/notification"));
const Profile = lazy(() => import("./app/profile/profile"));
const Message = lazy(() => import("./app/message/message"));
const Messages = lazy(() => import("./app/messages/messages"));
const Salaries = lazy(() => import("./app/salaries/salaries"));
const Complaints = lazy(() => import("./app/complaints/complaints"));

const App = () => {
  return (
    <Suspense
      fallback={
        <p className="text-white text-4xl text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Loading...
        </p>
      }
    >
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PageLayout />}>
          <Route index element={<Profile />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/message/:id" element={<Message />} />
          <Route path="/salaries" element={<Salaries />} />
          <Route path="/information" element={<Complaints />} />
        </Route>
      </Routes>
      <InstallApp />
    </Suspense>
  );
};

export default App;
