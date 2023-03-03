import { Fragment, useContext } from "react";
import MainHeader from "./MainHeader";
import Notification from "@/components/ui/notification";
import NotificationContext from "@/store/notification-context";

function Layout(props) {
  const notificationContext = useContext(NotificationContext);
  const activeNotification = notificationContext.notification;
  return (
    <Fragment>
      <MainHeader></MainHeader>
      <main>{props.children}</main>
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        ></Notification>
      )}
    </Fragment>
  );
}
export default Layout;
