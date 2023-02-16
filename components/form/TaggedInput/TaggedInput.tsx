import { useState } from "react";
import { useAppDispatch } from "../../../fetchConfig/store";
import { AddAlertMessage } from "../../../features/UI/UISlice";

import classes from "./TaggedInput.module.scss";

interface IProps {
  TagsArray: string[];
  setTagsArray: React.Dispatch<React.SetStateAction<string[]>>;
}
const TaggedInput: React.FC<IProps> = ({ TagsArray, setTagsArray }) => {
  const dispatch = useAppDispatch();

  const [CurrentTag, setCurrentTag] = useState("");

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ",") {
      if (CurrentTag.trim() === ",") return setCurrentTag("");
      if (TagsArray.length >= 10) {
        setCurrentTag("");
        return dispatch(
          AddAlertMessage({
            message: `You can only have 10 tags.`,
          })
        );
      }

      let tag = CurrentTag.trim().slice(0, -1).toLowerCase();
      if (CurrentTag.trim().length > 1) {
        if (TagsArray.indexOf(tag) > -1) {
          setCurrentTag("");
          return dispatch(
            AddAlertMessage({
              message: `"${tag}" already included in the tags`,
            })
          );
        }
        setTagsArray((prev) => [...prev, tag]);
        setCurrentTag("");
      }
    }
  };

  const RemoveTag = (tagToRemove: string) => {
    setTagsArray((prev) => {
      if (prev.length) {
        return prev.filter((tag) => tag !== tagToRemove);
      } else {
        return prev;
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTag(e.target.value);
  };

  return (
    <div className={classes.Container}>
      {TagsArray.map((tag, index) => (
        <div key={index} className={classes.Tag}>
          {tag}{" "}
          <span className={classes.Times} onClick={() => RemoveTag(tag)}>
            &times;
          </span>
        </div>
      ))}
      <div className={classes.InputContainer}>
        <input
          type="text"
          placeholder="Press 'comma' to save a tag"
          onKeyUp={(e) => handleKeyUp(e)}
          onChange={(e) => handleChange(e)}
          value={CurrentTag}
        />
        <label htmlFor="tags" className={classes.Label}>
          Press 'comma' to save a tag
        </label>
      </div>
    </div>
  );
};

export default TaggedInput;
