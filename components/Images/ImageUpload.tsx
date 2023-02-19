import { useRef, useState } from "react";
import Image from "next/image";

import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";

import { AiFillCloseCircle } from "react-icons/ai";

import { AddAlertMessage } from "../../features/UI/UISlice";
import ConfirmModal from "../modal/ConfirmModal";
import {
  DeleteCurrentCourseImage,
  SelectCourse,
} from "../../features/course/courseSlice";

import classes from "./ImageUpload.module.scss";

const ImageUpload: React.FC<{
  PreviewSource: any;
  setPreviewSource: React.Dispatch<any>;
  setValue: React.Dispatch<any>;
  title: string;
  isEdit?: boolean;
}> = ({ PreviewSource, setPreviewSource, setValue, title, isEdit }) => {
  const pickRef = useRef();
  const [ShowTiny, setShowTiny] = useState(false);
  const [ShowConfirm, setShowConfirm] = useState(false);
  const dispatch = useAppDispatch();
  const { courseLoading } = useAppSelector(SelectCourse);

  const handlePick = () => {
    // @ts-ignore
    pickRef?.current?.click();
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (!file) return "";
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    const { size, type } = file;
    if (size > 3000000) {
      setShowTiny(true);

      return dispatch(
        AddAlertMessage({ message: "Image too big. Should be less than 3MB" })
      );
    }

    if (!allowedTypes.includes(type)) {
      return dispatch(
        AddAlertMessage({
          message: "Invalid image. Image should be .png/.jpg/.jpeg",
        })
      );
    }

    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (reader.result) {
        setPreviewSource({ url: reader.result as string, size, type });
        setValue((prev: any) => {
          return {
            ...prev,
            imageBase64: { url: reader.result as string, size, type },
          };
        });
      }
      // @ts-ignore
      e.target.value = null;
    };
  };

  const clear = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    setPreviewSource(null);

    setValue((prev: any) => {
      return { ...prev, imageBase64: null };
    });
  };

  return (
    <>
      <div className={classes.Container} onClick={handlePick}>
        {PreviewSource && (
          <div>
            <AiFillCloseCircle
              onClick={
                isEdit
                  ? (e) => {
                      e.stopPropagation();
                      setShowConfirm(true);
                    }
                  : clear
              }
            />
            <Image
              src={PreviewSource?.url?.toString() || PreviewSource?.secure_url}
              alt="Picked Image"
              fill
            />
          </div>
        )}
        <span>{title}</span>
        <input
          type="file"
          name="fileToUpload"
          onChange={handleOnChange}
          ref={pickRef}
          accept="image/*"
          style={{ display: "none" }}
        />
      </div>
      <ConfirmModal
        close={() => setShowConfirm(false)}
        isOpen={ShowConfirm}
        loading={courseLoading === "delete-course-image"}
        proceedWithAction={() => {
          dispatch(DeleteCurrentCourseImage());
          setPreviewSource(null);
          setShowConfirm(false);
        }}
        closeButtonText="Remove Image?"
      />
      {ShowTiny && (
        <div className={classes.Tiny}>
          Reduce image size for free at{" "}
          <a href="https://tinypng.com/" target="__blank">
            Tiny PNG
          </a>{" "}
          or{" "}
          <a href="https://compressnow.com/" target="__blank">
            Compress Now
          </a>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
