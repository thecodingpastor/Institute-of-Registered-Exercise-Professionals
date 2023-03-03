import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

import MenuBar from "./MenuBar";

import classes from "./TipTapEditor.module.scss";

interface IProps {
  MainContent: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<any>>;
}

const Tiptap: React.FC<IProps> = ({ setState, MainContent, setValue }) => {
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
  });

  return (
    <div className={classes.TipTapContainer}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className={classes.EditorContainer} />
    </div>
  );
};

export default Tiptap;
