import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";
import useAxiosProtected from "../../hooks/useAxiosProtected";
import { SelectAuth } from "../../features/auth/authSlice";
import { SelectCourse } from "../../features/course/courseSlice";

import ScrollUpButton from "../general/ScrollUpButton";
import ToastContainer from "../toast/ToastContainer";
import Footer from "./footer/Footer";
import Navigation from "./navigation/Navigation";
import PersistLogin from "./PersistLogin";
import FloatingButtons from "../general/FloatingButtons";
import { useEffect } from "react";
import { GetCourses } from "../../features/course/courseApi";

interface IProps {
  children?: React.ReactNode;
}

const Layout: React.FC<IProps> = (props) => {
  const dispatch = useAppDispatch();
  const { alertMessages } = useAppSelector((state) => state.UI);
  const { user } = useAppSelector(SelectAuth);
  const { draftCourse, currentCourse, courseList } =
    useAppSelector(SelectCourse);

  // This adds the accessToken to the request headers on load
  useAxiosProtected();

  const { pathname } = useRouter();

  const allowedRoutesFloatingButtonParams = [
    "/course/[slug]",
    "/course/create",
    "/course/[slug]/edit",
  ];
  const draftMode = pathname === "/course/create";
  // && !!draftCourse?._id;

  useEffect(() => {
    if (courseList.length === 0) {
      dispatch(GetCourses({ id: user?._id || "none", pageNumber: 1 }));
    }
  }, [user?._id]);

  return (
    <PersistLogin>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navigation />
        {alertMessages.length > 0 && (
          <ToastContainer alertMessages={alertMessages} position="top-right" />
        )}
        <main>{props.children}</main>
        <Footer />
        <ScrollUpButton />
        {user?._id && allowedRoutesFloatingButtonParams.includes(pathname) && (
          <FloatingButtons
            // @ts-ignore
            itemID={draftMode ? draftCourse?._id : currentCourse?._id}
            // @ts-ignore
            isPublished={currentCourse?.isPublished!}
            isDraft={draftMode}
          />
        )}
      </div>
    </PersistLogin>
  );
};

export default Layout;
