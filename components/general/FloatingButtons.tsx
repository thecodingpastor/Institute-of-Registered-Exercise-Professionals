import { useRouter } from "next/router";

import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { IoArrowUndoSharp } from "react-icons/io5";
import {
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from "react-icons/md";

import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";
import useAxiosProtected from "../../hooks/useAxiosProtected";

import { SelectUI, SetConfirmModal } from "../../features/UI/UISlice";

import ConfirmModal from "../modal/ConfirmModal";

import classes from "./FloatingButtons.module.scss";
import { SelectCourse } from "../../features/course/courseSlice";
import {
  DeleteCourse,
  PublishAndUnpublishCourse,
} from "../../features/course/courseApi";

interface IProps {
  itemID: string;
  isPublished: boolean;
  isDraft?: boolean;
}

const FloatingButtons: React.FC<IProps> = ({
  itemID,
  isPublished,
  isDraft,
}) => {
  const {
    pathname,
    push,
    back,
    query: { slug },
  } = useRouter();

  const dispatch = useAppDispatch();
  const { confirmModalIsOpen } = useAppSelector(SelectUI);
  const { courseLoading } = useAppSelector(SelectCourse);
  // This "useAxiosProtected()" is to add the access token to header for request
  useAxiosProtected();

  const editMode = pathname === "/course/[slug]/edit";
  const createMode = pathname === "/course/create";
  const removeEditAndPublishButton =
    // draftMode ||
    editMode || createMode;
  const showDeleteButton =
    editMode || pathname === "/course/[slug]" || createMode;

  const HandleDelete = () => {
    dispatch(DeleteCourse(itemID)).then(() => {
      push("/course");
      dispatch(SetConfirmModal(null));
    });
  };

  const CloseConfirmModal = () => {
    dispatch(SetConfirmModal(null));
  };

  const GetCourseToEdit = () => {
    push("/course/" + slug + "/edit");
  };

  const HandlePublish = (itemID: string, isPublished: boolean) => {
    dispatch(PublishAndUnpublishCourse({ slug: itemID, isPublished }));
  };

  return (
    <div className={classes.Container}>
      {!removeEditAndPublishButton && <AiFillEdit onClick={GetCourseToEdit} />}
      <IoArrowUndoSharp onClick={() => back()} />
      {removeEditAndPublishButton ? null : !isPublished ? (
        <MdOutlinePublishedWithChanges
          onClick={() => HandlePublish(itemID, isPublished)}
        />
      ) : (
        <MdOutlineUnpublished
          onClick={() => HandlePublish(itemID, isPublished)}
        />
      )}
      {showDeleteButton && (
        <AiFillDelete
          className={classes.DeleteButton}
          onClick={() => dispatch(SetConfirmModal("DeleteCourse"))}
        />
      )}
      {confirmModalIsOpen === "DeleteCourse" && (
        <ConfirmModal
          isOpen={confirmModalIsOpen === "DeleteCourse"}
          close={CloseConfirmModal}
          loading={courseLoading === "delete_course"}
          proceedWithAction={HandleDelete}
          closeButtonText={
            isDraft && pathname === "/course/create"
              ? "Delete Draft"
              : "Delete Course"
          }
        />
      )}
    </div>
  );
};

export default FloatingButtons;
