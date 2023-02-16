import { useRef, useState } from "react";

import { ImageAreaProps } from "../general/types";

import Image from "next/image";
import Button from "../form/Button";
import Spin from "../loaders/Spin";

import { AiFillCloseCircle } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../fetchConfig/store";
import { SelectCourse } from "../../features/course/courseSlice";

import {
  DeleteCourseImage,
  UploadCourseImage,
} from "../../features/course/courseApi";

import classes from "./ImageArea.module.scss";

const ImageArea: React.FC<ImageAreaProps> = ({
  UploadedFile,
  setUploadedFile,
  isPayment,
}) => {
  const dispatch = useAppDispatch();
  const { courseLoading, draftCourse, currentCourse } =
    useAppSelector(SelectCourse);
  const [PreviewSource, setPreviewSource] = useState<string | ArrayBuffer>("");
  const pickRef = useRef<any>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!PreviewSource) return;
    dispatch(
      UploadCourseImage({
        modelId:
          draftCourse?._id ||
          (currentCourse !== "loading" && currentCourse?._id) ||
          null,
        model: "course",
        imageBase64String: PreviewSource,
      })
    ).then((data) => {
      if (data.meta.requestStatus !== "rejected") {
        setUploadedFile(data.payload.image);
      }
      setPreviewSource("");
    });
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files ? e.currentTarget.files[0] : null;
    if (!file) return "";
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      reader.result && setPreviewSource(reader.result);
    };
  };

  const handlePick = () => {
    pickRef.current.click();
  };

  const DeleteImage = () => {
    dispatch(
      DeleteCourseImage({
        imageCloudId: UploadedFile?.public_id,
        modelId:
          draftCourse?._id ||
          (currentCourse !== "loading" && currentCourse?._id),
      })
    ).then((data) => {
      if (data.meta.requestStatus !== "rejected") {
        setUploadedFile("");
      }
    });
  };

  return (
    <div className={classes.Container}>
      <form onSubmit={(e) => handleSubmit(e)} className={classes.PickFile}>
        <input
          type="file"
          name="fileToUpload"
          onChange={handleOnChange}
          ref={pickRef}
          accept="image/*"
          style={{ display: "none" }}
        />
        {!UploadedFile?.public_id && (
          <div style={{ cursor: "pointer" }} onClick={handlePick}>
            {!isPayment ? "Choose image" : "Upload Proof of Payment Snapshot"}
          </div>
        )}
        {PreviewSource && (
          <div style={{ position: "relative", cursor: "default" }}>
            <Image
              src={PreviewSource.toString()}
              alt="Picked Image"
              width={100}
              height={100}
            />

            <span>Not Upload Yet</span>
          </div>
        )}
        {UploadedFile?.public_id && (
          <div className={classes.UploadedFile}>
            <div className={classes.File}>
              <Image
                src={UploadedFile?.secure_url}
                width="100"
                height="100"
                alt="Loading Image"
                blurDataURL="/images/question.jpg"
                placeholder="blur"
              />
              {courseLoading === "delete-course-image" ? (
                <Spin className={classes.CloseBtn} />
              ) : (
                <AiFillCloseCircle
                  className={classes.CloseBtn}
                  onClick={DeleteImage}
                />
              )}
            </div>
          </div>
        )}

        {PreviewSource && !UploadedFile?.public_id && (
          <>
            {courseLoading === "upload-course-image" ? (
              <Spin style={{ width: "2rem !important" }} />
            ) : (
              <Button text="Upload" type="submit" mode="pry" />
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default ImageArea;
