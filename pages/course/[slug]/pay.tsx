import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { SelectCourse } from "../../../features/course/courseSlice";

import Transition from "../../../components/general/Transition";
import PaymentForm from "../../../features/order/components/PaymentForm";
import CaptchaContainer from "../../../components/layout/CaptchaContainer";

import classes from "./pay.module.scss";
import { GetSingleCourseFromBackend } from "../../../features/course/courseApi";
import AuthPageLoading from "../../../components/loaders/AuthPageLoading";
import { AddAlertMessage } from "../../../features/UI/UISlice";
import { SetCurrentOrder } from "../../../features/order/orderSlice";

const PaymentPage = () => {
  const dispatch = useAppDispatch();
  const { currentCourse } = useAppSelector(SelectCourse);
  const { pathname, query, replace } = useRouter();
  const { slug } = query;
  const isMounted = useRef(false);

  useEffect(() => {
    // This works when the edit page is reloaded
    if (
      currentCourse === "loading" &&
      pathname === "/course/[slug]/pay" &&
      slug
    ) {
      dispatch(GetSingleCourseFromBackend(slug as string));
    }

    return () => {
      // Remove from local storage if user hasn't written anything
      const { fullName, email, phone, imageBase64, address, state, country } =
        JSON.parse(localStorage.getItem("irep_order")) || {};
      const condition =
        !!fullName ||
        !!email ||
        !!phone ||
        !!imageBase64 ||
        !!address ||
        !!state ||
        !!country;

      if (isMounted.current) {
        if (!condition) {
          dispatch(SetCurrentOrder(null));
          localStorage.removeItem("irep_order");
        }
      }
      isMounted.current = true;
    };
  }, [slug]);

  if (currentCourse === "loading") return <AuthPageLoading />;

  if (!currentCourse?._id) {
    replace("/course");
    dispatch(AddAlertMessage({ message: "Course not found" }));
    return;
  }

  return (
    <CaptchaContainer>
      <Transition className={classes.Container} mode="scale-in">
        <div className={classes.Bank}>
          <p>
            Bank Name: <b>Zenith Bank</b>
          </p>
          <p>
            Account Name:{" "}
            <b>Institute of Registered Exercise Professionals Ltd/Gte</b>
          </p>
          <p>
            Account Number: <b>1013886159</b>
          </p>
        </div>
        <PaymentForm />
      </Transition>
    </CaptchaContainer>
  );
};

export default PaymentPage;
