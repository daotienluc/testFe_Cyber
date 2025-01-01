import { useRoutes } from "react-router-dom";
import { pathDefault } from "./common/path";
import HomeTemplate from "./template/HomeTemplate/HomeTemplate";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import React from "react";
import { ToastContainer, toast, ToastOptions, Bounce } from "react-toastify";
import CreateTask from "./template/HomeTemplate/components/CreateTask";
import CreateProject from "./template/HomeTemplate/components/CreateProject";

type NotificationContextType = (
  type: "info" | "success" | "warning" | "error",
  content: string,
  timeClose?: number
) => void;

export const NotificationContext = React.createContext<NotificationContextType>(
  () => {
    throw new Error(
      "NotificationContext is not provided. Wrap your component with NotificationContext.Provider."
    );
  }
);

const arrRouter = [
  {
    path: pathDefault.homepage,
    element: <HomeTemplate />,
    children: [
      {
        index: true,
        element: <CreateTask />,
      },
      {
        path: pathDefault.createtask,
        element: <CreateTask />,
      },
      {
        path: pathDefault.createproject,
        element: <CreateProject />,
      },
    ],
  },
  {
    path: pathDefault.signin,
    element: <SignIn />,
  },
  {
    path: pathDefault.signup,
    element: <SignUp />,
  },
];

function App() {
  const routes = useRoutes(arrRouter);

  const handleNotification: NotificationContextType = (
    type,
    content,
    timeClose = 3000
  ) => {
    const options: ToastOptions = {
      position: "top-right",
      autoClose: timeClose,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    };

    toast[type](content, options);
  };

  return (
    <>
      <NotificationContext.Provider value={handleNotification}>
        {routes}
        <ToastContainer />
      </NotificationContext.Provider>
    </>
  );
}

export default App;
