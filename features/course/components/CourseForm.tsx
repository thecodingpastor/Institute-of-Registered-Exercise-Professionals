import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { CourseFormInputsArray, TestNumber } from "./CourseFormInputsArray";
import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { AddAlertMessage } from "../../UI/UISlice";
import { CreateCourse, EditCourse } from "../courseApi";
import { SelectCourse, SetDraftCourse } from "../courseSlice";
import { SelectAuth } from "../../auth/authSlice";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

import Tiptap from "../../../components/editor/TipTapEditor";
import Button from "../../../components/form/Button";
import FormInput from "../../../components/form/FormInput";
import Transition from "../../../components/general/Transition";
import ImageUpload from "../../../components/Images/ImageUpload";
import Spin from "../../../components/loaders/Spin";

import classes from "./CourseForm.module.scss";
import { CourseImageType } from "../types";
import CreateAnnouncementModal from "./CreateAnnouncementModal";

const CourseForm: React.FC<{ isEdit?: boolean }> = ({ isEdit }) => {
  let isMounted = false;
  const [DataIsSaved, setDataIsSaved] = useState(false);
  const [OpenCreateAnnouncementModal, setOpenCreateAnnouncementModal] =
    useState(false);

  useEffect(() => {
    // Clear the LS and  draft course store
    if (DataIsSaved) {
      localStorage.removeItem("irep_course_draft");
      dispatch(SetDraftCourse(null));
    }
    return () => {
      if (isMounted) {
        // Update draft course in store when user leaves page
        if (!DataIsSaved) {
          dispatch(
            SetDraftCourse(
              JSON.parse(localStorage.getItem("irep_course_draft"))
            )
          );
        }
      }

      isMounted = true;
    };
  }, [DataIsSaved]);

  const dispatch = useAppDispatch();
  const { draftCourse, currentCourse, courseLoading } =
    useAppSelector(SelectCourse);
  const {
    user: { firstName, lastName, _id },
  } = useAppSelector(SelectAuth);
  const { push } = useRouter();

  const init = !isEdit
    ? {
        title: draftCourse?.title || "",
        onlinePrice: draftCourse?.onlinePrice || "",
        offlinePrice: draftCourse?.offlinePrice || "",
        promoPercentage: draftCourse?.promoPercentage || "",
        duration: draftCourse?.duration || "",
      }
    : currentCourse !== "loading" && {
        title: currentCourse?.title || "",
        onlinePrice: currentCourse?.onlinePrice || 0,
        offlinePrice: currentCourse?.offlinePrice || 0,
        promoPercentage: currentCourse?.promoPercentage || 0,
        duration: currentCourse?.duration || "",
      };

  const [MainContent, setMainContent] = useState<string>(
    !isEdit
      ? draftCourse?.mainContent || ""
      : currentCourse !== "loading" && currentCourse?.mainContent
  );
  const [CourseFormValues, setCourseFormValues] = useState(init);

  const [PreviewSource, setPreviewSource] = useState<CourseImageType>(
    !isEdit
      ? draftCourse?.image
      : currentCourse !== "loading" && currentCourse?.image
  );

  const { title, onlinePrice, offlinePrice, promoPercentage, duration } =
    CourseFormValues;

  const CourseIsValid =
    /^.{5,100}$/.test(title) &&
    /^.{10,}$/.test(MainContent) &&
    // @ts-ignore
    TestNumber.test(onlinePrice) &&
    // @ts-ignore
    TestNumber.test(offlinePrice) &&
    // @ts-ignore
    TestNumber.test(promoPercentage) &&
    /^.{4,30}$/.test(duration) &&
    !!PreviewSource;

  // I only implemented this to create course, not to edit it
  const [Value, setValue] = useLocalStorage(
    "irep_course_draft",
    {
      ...CourseFormValues,
      mainContent: MainContent,
      image: PreviewSource,
    },
    !isEdit
  );

  const submit = () => {
    if (!PreviewSource?.size && !PreviewSource?.secure_url)
      return dispatch(
        AddAlertMessage({
          message: "An image has not been provided.",
        })
      );

    if (!CourseIsValid)
      return dispatch(
        AddAlertMessage({
          message:
            "You did not fill in the right data. Please look closely at the placeholder texts and error messages",
        })
      );

    if (MainContent.trim().length < 40) {
      return dispatch(
        AddAlertMessage({
          message: "Main content too small. Type more content in the editor",
        })
      );
    }

    const handleReset = (data: any) => {
      if (data.meta.requestStatus === "fulfilled") {
        setDataIsSaved(true);
        push("/course");
        setMainContent("");
        setCourseFormValues(init);
      }
    };

    if (!isEdit) {
      return dispatch(
        CreateCourse({
          title,
          onlinePrice,
          offlinePrice,
          promoPercentage,
          duration,
          authorId: _id,
          mainContent: MainContent,
          image: PreviewSource,
          createdBy: firstName + " " + lastName,
        })
      ).then((data) => {
        handleReset(data);
      });
    } else {
      dispatch(
        EditCourse({
          slug: (currentCourse !== "loading" && currentCourse?.slug) || null,
          title,
          onlinePrice,
          offlinePrice,
          promoPercentage,
          duration,
          authorId: _id,
          mainContent: MainContent,
          image: PreviewSource,
          createdBy: firstName + " " + lastName,
        })
      ).then((data) => {
        handleReset(data);
      });
    }
  };

  return (
    <Transition mode="scale-out" className={classes.Container}>
      <h1>{!isEdit ? "Create" : "Edit"} Course</h1>
      <ImageUpload
        PreviewSource={PreviewSource}
        setPreviewSource={setPreviewSource}
        setValue={setValue}
        title="Upload image"
        isEdit={isEdit}
      />
      <form>
        {CourseFormInputsArray.map((input) => {
          return (
            <FormInput
              key={input.name}
              value={CourseFormValues[input.name]}
              focused="false"
              border
              {...input}
              onChange={(e: any) => {
                setCourseFormValues({
                  ...CourseFormValues,
                  [e.target.name]: e.target.value,
                });
                setValue(() => {
                  if (typeof Value === "object") {
                    return {
                      ...Value,
                      [e.target.name]: e.target.value,
                    };
                  }
                });
              }}
            />
          );
        })}
        <Tiptap
          setState={setMainContent}
          MainContent={MainContent}
          setValue={setValue}
        />

        <div className="text-center">
          {["edit_course", "create_course"].includes(courseLoading) ? (
            <Spin />
          ) : (
            <Button
              text={isEdit ? "Update" : "Create"}
              type="button"
              mode="pry"
              disabled={!CourseIsValid}
              onClick={!CourseIsValid ? () => {} : submit}
            />
          )}
          {isEdit && (
            <Button
              text="Add Announcement"
              mode="default"
              className={classes.AnnouncementBtn}
              onClick={() => setOpenCreateAnnouncementModal(true)}
            />
          )}
        </div>
      </form>
      {OpenCreateAnnouncementModal && (
        <CreateAnnouncementModal
          isOpen={OpenCreateAnnouncementModal}
          close={() => setOpenCreateAnnouncementModal(false)}
          courseId={currentCourse !== "loading" && currentCourse?._id}
          prevAnnouncement={
            currentCourse !== "loading" && currentCourse?.announcement
          }
        />
      )}
    </Transition>
  );
};

export default CourseForm;
