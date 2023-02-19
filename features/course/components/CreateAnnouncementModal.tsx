import { useState } from "react";

import Modal from "../../../components/modal/Modal";
import Button from "../../../components/form/Button";
import Spin from "../../../components/loaders/Spin";
import { AnnouncementFormInputArray } from "./CourseFormInputsArray";
import FormInput from "../../../components/form/FormInput";

import classes from "./CreateAnnouncementModal.module.scss";
import { useAppDispatch, useAppSelector } from "../../../fetchConfig/store";
import { AddAlertMessage } from "../../UI/UISlice";
import { CreateAnnouncement, DeleteAnnouncement } from "../courseApi";
import { SelectCourse } from "../courseSlice";
// const

const CreateAnnouncementModal = ({
  close,
  isOpen,
  courseId,
  prevAnnouncement,
}) => {
  const dispatch = useAppDispatch();
  const { courseLoading } = useAppSelector(SelectCourse);
  const [AnnouncementFormValues, setAnnouncementFormValues] = useState({
    text: prevAnnouncement?.text || "",
    link: prevAnnouncement?.link || "",
    date: prevAnnouncement?.date || "",
    isGeneral: prevAnnouncement?.isGeneral?.toString() || "",
  });

  const { text, link, date, isGeneral } = AnnouncementFormValues;

  const AnnouncementIsValid =
    /^.{20,200}$/.test(text?.trim()) &&
    /^.{5,200}$/.test(link?.trim()) &&
    !!date &&
    (isGeneral === "true" || isGeneral === "false");

  const submit = () => {
    if (!AnnouncementIsValid)
      return dispatch(AddAlertMessage({ message: "Invalid inputs." }));

    dispatch(
      CreateAnnouncement({
        ...AnnouncementFormValues,
        courseId,
      })
    ).then(() => {
      close();
    });
  };

  return (
    <Modal
      close={close}
      isOpen={isOpen}
      disableBackgroundClick
      className={classes.Container}
    >
      <h2 className="Linez">Add Announcement to Course</h2>

      <form>
        {AnnouncementFormInputArray.map((input) => {
          return (
            <FormInput
              key={input.name}
              value={AnnouncementFormValues[input.name]}
              focused="false"
              border
              {...input}
              onChange={(e: any) => {
                setAnnouncementFormValues({
                  ...AnnouncementFormValues,
                  [e.target.name]: e.target.value,
                });
              }}
            />
          );
        })}

        <div className="text-center">
          {courseLoading === "create_announcement" ? (
            <Spin />
          ) : (
            <Button
              text="Create"
              type="button"
              mode="pry"
              disabled={!AnnouncementIsValid}
              onClick={!AnnouncementIsValid ? () => {} : submit}
            />
          )}

          {prevAnnouncement?.text && (
            <>
              {courseLoading === "delete_announcement" ? (
                <Spin />
              ) : (
                <Button
                  text="Delete"
                  type="button"
                  mode="danger"
                  disabled={courseLoading === "delete_announcement"}
                  onClick={
                    courseLoading === "delete_announcement"
                      ? () => {}
                      : () =>
                          dispatch(DeleteAnnouncement(courseId)).then(() =>
                            close()
                          )
                  }
                />
              )}
            </>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default CreateAnnouncementModal;
