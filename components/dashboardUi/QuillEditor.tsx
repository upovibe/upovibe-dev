import React, { useRef, useEffect } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

interface QuillEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  initialValue,
  onChange,
}) => {
  const quillRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        placeholder: "Enter content...",
        modules: {
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
          ],
        },
      });

      quillInstance.current.on("text-change", () => {
        const html = quillRef.current?.querySelector(".ql-editor")?.innerHTML || "";
        onChange(html);
      });
    }
  }, [onChange]);

  useEffect(() => {
    if (quillInstance.current) {
      quillInstance.current.root.innerHTML = initialValue || "";
    }
  }, [initialValue]);

  return <div ref={quillRef} />;
};

export default QuillEditor;
