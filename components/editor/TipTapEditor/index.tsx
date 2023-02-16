// import { useRef, useEffect } from "react";
// import { useRouter } from "next/router";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
// @ts-ignore
// import { useDebounce } from "use-debounce";

import MenuBar from "./MenuBar";

// import { useAppDispatch } from "../../../fetchConfig/store";
// import { SaveAsDraft } from "../../../features/course/courseApi";

import classes from "./TipTapEditor.module.scss";

interface IProps {
  MainContent: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

const Tiptap: React.FC<IProps> = ({ setState, MainContent, setValue }) => {
  // const {
  //   pathname,
  //   query: { slug },
  // } = useRouter();

  // const dispatch = useAppDispatch();
  // const IsFocused = useRef(false);

  // const HandleDebounce = (content: string) => {
  //   // This makes sure that it only happens when in draft, not for already saved projects

  //   if (!slug && pathname === "/course/create") {
  //     dispatch(SaveAsDraft({ name: "mainContent", value: content }));
  //   }
  // };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: MainContent,
    onUpdate: ({ editor }) => {
      setState(editor.getHTML());
      setValue((prev: any) => {
        return { ...prev, mainContent: editor.getHTML() };
      });
    },
    // onFocus() {
    //   if (!IsFocused.current) IsFocused.current = true;
    // },
  });

  // const [debouncedEditor] = useDebounce(editor?.state.doc.content, 7000);

  // useEffect(() => {
  //   if (debouncedEditor && IsFocused.current) {
  //     HandleDebounce(MainContent);
  //   }
  // }, [debouncedEditor]);

  return (
    <div className={classes.TipTapContainer}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={classes.EditorContainer} />
    </div>
  );
};

export default Tiptap;
