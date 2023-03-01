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
import { PaystackButton } from "react-paystack";

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

  const [PaymentMode, setPaymentMode] = useState<"card" | "transfer">(null);
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
    /^([0|+[0-9]{1,5})?([7-9][0-9]{9})$/.test(phone?.trim()) &&
    (Mode === "offline" || Mode === "online");

  const [Value, setValue] = useLocalStorage("irep_order", {
    ...PaymentFormValues,
    imageBase64: PreviewSource,
  });

  const handleCreateOrder = () => {
    if (Mode !== "offline" && Mode !== "online") {
      return dispatch(
        AddAlertMessage({
          message: "Do you want it offline or online? Please pick one.",
        })
      );
    }

    if (PaymentMode === "transfer" && !PreviewSource?.size && !isFree) {
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
          paymentMode: !isFree ? PaymentMode : "none",
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
                  Mode,
                  currentCourse?.announcement?.date
                )
              : "",
          // @ts-ignore
          course: currentCourse?.title,
          courseId: currentCourse !== "loading" && currentCourse?._id,
          image: PaymentMode === "transfer" ? PreviewSource : null,
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

  // Paystack ====================================================
  const componentProps = {
    amount:
      currentCourse !== "loading"
        ? CalculatePrice(
            Mode === "offline"
              ? currentCourse?.offlinePrice * 100
              : currentCourse?.onlinePrice * 100,
            currentCourse?.promoPercentage,
            Mode,
            currentCourse?.announcement?.date
          )
        : "", // in kobo
    email: PaymentFormValues?.email,
    // meta data object can be added
    publicKey: "pk_live_e9b77e900d9c94b63d5e197c3e39133f41da3b5c",
    text: "PAY NOW",
    onSuccess: (data: any) => {
      if (data.status === "success") handleCreateOrder();
    },
  };

  const isInvalidPrice = componentProps.amount === "N/A";
  const isFree = componentProps.amount === "Free";
  let content = (
    // @ts-ignore
    <PaystackButton {...componentProps} className={classes.Btn} />
  );
  // Paystack =============================================>>>>>>>>>>>>

  return (
    <div className={classes.Container}>
      <h2 className="text-center">
        Place your order for <br /> "
        {currentCourse !== "loading" && currentCourse?.title}"
      </h2>

      <form>
        <>
          <div className={classes.Mode}>
            <b>Pick Class Mode:</b>
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
              <div className={"CourseCard " + classes.CourseCard}>
                <FormatPrice
                  price={
                    Mode === "offline"
                      ? currentCourse.offlinePrice
                      : currentCourse.onlinePrice
                  }
                  promoPercentage={currentCourse?.promoPercentage}
                  status={Mode}
                  expiryDate={currentCourse?.announcement?.date}
                  showHidden
                />
              </div>
            )}
          </div>
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

          {!isFree && (
            <FormInput
              name="mode"
              onChange={(e: any) => setPaymentMode(e.target.value)}
              value={PaymentMode}
              required
              type="select"
              disabled={Loading}
              defaultValue="Card or Transfer"
              options={[
                { caption: "Card", value: "card" },
                { caption: "Transfer", value: "transfer" },
              ]}
            />
          )}
        </>
      </form>
      {PaymentMode === "transfer" ? (
        <>
          {isInvalidPrice ? (
            <p className="text-center">Invalid price. Change class mode</p>
          ) : (
            <>
              {!isFree && (
                <>
                  <div className={classes.Bank}>
                    <p>
                      Bank Name: <b>Zenith Bank</b>
                    </p>
                    <p>
                      Account Name:{" "}
                      <b>
                        Institute of Registered Exercise Professionals Ltd/Gte
                      </b>
                    </p>
                    <p>
                      Account Number: <b>1013886159</b>
                    </p>
                  </div>
                  <ImageUpload
                    PreviewSource={PreviewSource}
                    setPreviewSource={setPreviewSource}
                    setValue={setValue}
                    title="Upload receipt"
                  />
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {" "}
          {OrderIsValid && PaymentMode === "card" ? (
            <>
              {Loading ? (
                <Spin />
              ) : (
                <div className={classes.Paystack}>
                  {isInvalidPrice ? (
                    <p>Invalid price. Change class mode</p>
                  ) : (
                    <div className={classes.Paystack}>{content}</div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {isFree ? (
                <div className="text-center">
                  {Loading ? (
                    <Spin />
                  ) : (
                    <Button
                      text="Get For Free"
                      mode="pry"
                      onClick={handleCreateOrder}
                    />
                  )}
                </div>
              ) : (
                <p className="text-center">
                  Fill in the right details to submit your order
                </p>
              )}
            </>
          )}
        </>
      )}
      {PaymentMode === "transfer" && (
        <div className="text-center">
          {Loading ? (
            <Spin />
          ) : (
            <>
              {!isInvalidPrice && (
                <>
                  <Button
                    text={!isFree ? "Submit" : "Get For Free"}
                    type="button"
                    mode="pry"
                    disabled={!OrderIsValid}
                    onClick={
                      OrderIsValid && PaymentMode === "transfer"
                        ? handleCreateOrder
                        : () => {}
                    }
                  />
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
