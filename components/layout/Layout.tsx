import { useRouter } from "next/router";

import { useAppSelector } from "../../fetchConfig/store";
import useAxiosProtected from "../../hooks/useAxiosProtected";
import { SelectAuth } from "../../features/auth/authSlice";
import { SelectCourse } from "../../features/course/courseSlice";

import ScrollUpButton from "../general/ScrollUpButton";
import ToastContainer from "../toast/ToastContainer";
import Footer from "./footer/Footer";
import Navigation from "./navigation/Navigation";
import PersistLogin from "./PersistLogin";
import Announcement from "../general/Announcement";
import FloatingButtons from "../general/FloatingButtons";

interface IProps {
  children?: React.ReactNode;
}

const Layout: React.FC<IProps> = (props) => {
  const { alertMessages } = useAppSelector((state) => state.UI);
  const { accessToken } = useAppSelector(SelectAuth);
  const { draftCourse, currentCourse } = useAppSelector(SelectCourse);
  // This adds the accessToken to the request headers on load
  useAxiosProtected();

  const { pathname } = useRouter();

  const allowedRoutesFloatingButtonParams = [
    "/course/[slug]",
    "/course/create",
    "/course/[slug]/edit",
  ];
  const draftMode = pathname === "/course/create" && !!draftCourse?._id;

  return (
    <PersistLogin>
      <Announcement />
      <Navigation />
      {alertMessages.length > 0 && (
        <ToastContainer alertMessages={alertMessages} position="top-right" />
      )}
      <main>{props.children}</main>
      <Footer />
      <ScrollUpButton />
      {accessToken && allowedRoutesFloatingButtonParams.includes(pathname) && (
        <FloatingButtons
          // @ts-ignore
          itemID={draftMode ? draftCourse?._id : currentCourse?._id}
          // @ts-ignore
          isPublished={currentCourse?.isPublished!}
          isDraft={draftMode}
        />
      )}
    </PersistLogin>
  );
};

export default Layout;
