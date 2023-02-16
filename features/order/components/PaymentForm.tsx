import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

import Button from "../../../components/form/Button";
import FormInput from "../../../components/form/FormInput";
import ImageUpload from "../../../components/Images/ImageUpload";
import Spin from "../../../components/loaders/Spin";
import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { LetterSpaceDash, ValidateEmail } from "../../../utils/validations";
import { CreateOrder } from "../orderApi";
import { AddAlertMessage } from "../../UI/UISlice";
import { PaymentFormInputsArray } from "../../course/components/CourseFormInputsArray";

import classes from "./PaymentForm.module.scss";
import { SelectCourse } from "../../course/courseSlice";
import FormatPrice from "../../course/components/FormatPrice";
import CalculatePrice from "../../course/components/calculatePrice";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { SelectOrder, SetCurrentOrder } from "../orderSlice";

const PaymentForm = () => {
  let isMounted = false;
  const dispatch = useAppDispatch();
  const { currentCourse } = useAppSelector(SelectCourse);
  const { currentOrder } = useAppSelector(SelectOrder);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { push } = useRouter();

  const init = {
    fullName: currentOrder?.fullName || "",
    email: currentOrder?.email || "",
    phone: currentOrder?.phone || "",
    address: currentOrder?.address || "",
    state: currentOrder?.state || "",
    country: currentOrder?.country || "",
  };

  type PreviewSourceType = { url: string; size: number; type: string };

  const [PaymentFormValues, setPaymentFormValues] = useState(init);
  const [PreviewSource, setPreviewSource] = useState<PreviewSourceType>(
    currentOrder?.imageBase64 || null
  );
  const [Mode, setMode] = useState<"offline" | "online">(null);
  const [Loading, setLoading] = useState(false);
  const [DataIsSaved, setDataIsSaved] = useState(false);

  const { fullName, email, phone, address, state, country } = PaymentFormValues;

  useEffect(() => {
    // Clear the LS and  draft order store
    if (DataIsSaved) {
      localStorage.removeItem("irep_order");
      dispatch(SetCurrentOrder(null));
    }
    return () => {
      if (isMounted) {
        // Update draft order in store when user leaves page
        if (!DataIsSaved) {
          dispatch(
            SetCurrentOrder(JSON.parse(localStorage.getItem("irep_order")))
          );
        }
      }

      isMounted = true;
    };
  }, []);

  const OrderIsValid =
    LetterSpaceDash(fullName.trim()) &&
    ValidateEmail(email?.trim()) &&
    /^.{5,100}$/.test(address?.trim()) &&
    LetterSpaceDash(state?.trim()) &&
    LetterSpaceDash(country?.trim()) &&
    /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/.test(phone?.trim());

  const [Value, setValue] = useLocalStorage("irep_order", {
    ...PaymentFormValues,
    imageBase64: PreviewSource,
  });

  const handleCreateOrder = (e: any) => {
    e.preventDefault();

    if (Mode !== "offline" && Mode !== "online") {
      return dispatch(
        AddAlertMessage({
          message: "Do you want it offline or online? Please pick one.",
        })
      );
    }

    if (!PreviewSource?.size) {
      return dispatch(
        AddAlertMessage({
          message: "Upload a screen shot of your transaction receipt",
        })
      );
    }

    if (!OrderIsValid) {
      return dispatch(
        AddAlertMessage({
          message: "Invalid parameters entered. Enter all fields correctly.",
        })
      );
    }

    if (!executeRecaptcha) {
      return dispatch(
        AddAlertMessage({ message: "Execute recaptcha not available" })
      );
    }

    setLoading(true);
    executeRecaptcha("createOrder").then((gReCaptchaToken) => {
      dispatch(
        CreateOrder({
          ...PaymentFormValues,
          gReCaptchaToken,
          mode: Mode,
          promoPercent:
            currentCourse !== "loading" ? currentCourse?.promoPercentage : 0,
          // @ts-ignore
          amount:
            currentCourse !== "loading"
              ? CalculatePrice(
                  Mode === "offline"
                    ? currentCourse?.offlinePrice
                    : currentCourse?.onlinePrice,
                  currentCourse?.promoPercentage,
                  Mode
                )
              : "",
          // @ts-ignore
          course: currentCourse?.title,
          imageBase64: PreviewSource,
        })
      ).then((data) => {
        if (data.meta.requestStatus === "fulfilled") {
          setDataIsSaved(true);
          push("/course");
          setPaymentFormValues(init);
          localStorage.removeItem("irep_order");
        }
        setLoading(false);
      });
    });
  };

  return (
    <div className={classes.Container}>
      <h1 className="text-center">
        Place your order for <br /> "
        {currentCourse !== "loading" && currentCourse?.title}"
      </h1>

      <form>
        {PaymentFormInputsArray.map((input) => {
          return (
            <FormInput
              key={input.name}
              value={PaymentFormValues[input.name]}
              focused="false"
              border
              disabled={Loading}
              {...input}
              onChange={(e: any) => {
                setPaymentFormValues({
                  ...PaymentFormValues,
                  [e.target.name]: e.target.value,
                });
                setValue({
                  ...Value,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          );
        })}

        <div className={classes.Mode}>
          <span
            onClick={() => setMode("offline")}
            className={Mode === "offline" ? classes.Active : ""}
          >
            Offline
          </span>
          <span
            onClick={() => setMode("online")}
            className={Mode === "online" ? classes.Active : ""}
          >
            Online
          </span>
          {Mode && currentCourse !== "loading" && (
            <div className="CourseCard" style={{ marginLeft: "auto" }}>
              <FormatPrice
                price={
                  Mode === "offline"
                    ? currentCourse.offlinePrice
                    : currentCourse.onlinePrice
                }
                promoPercentage={currentCourse?.promoPercentage}
                status={Mode}
              />
            </div>
          )}
        </div>
        <ImageUpload
          PreviewSource={
            PreviewSource
            // ||
            // (pathname === "/course/[slug]/pay" &&
            //   JSON.parse(localStorage.getItem("irep_order"))?.imageBase64)
          }
          setPreviewSource={setPreviewSource}
          setValue={setValue}
          title="Upload receipt"
        />
        <div className="text-center">
          {Loading ? (
            <Spin />
          ) : (
            <Button
              text="Submit"
              type="button"
              mode="pry"
              disabled={!OrderIsValid}
              // @ts-ignore
              onClick={(e: any) => handleCreateOrder(e)}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
