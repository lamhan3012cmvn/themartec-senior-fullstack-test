import { CKEditor } from "ckeditor4-react";
import { ICMSCKEditor } from "./CMSCKEditor.props";
import { useDebounce } from "~/hooks";

function GeneratorCKEditor(props: ICMSCKEditor) {
  const handleChange = useDebounce((e: any) => {
    const content = e.editor.getData();
    if (props.onChange) props.onChange(content);
  }, 500);

  return (
    <div className="w-full">
      <CKEditor
        initData={""}
        editorUrl={"/ckeditor-2/ckeditor.js"}
        onChange={handleChange}
        config={{
          height: "50vh",
          filebrowserUploadUrl: `#`,
          filebrowserBrowseUrl: `#`,
          // htmlEncodeOutput: false,
          entities: false,
          entities_latin: false,
          forceSimpleAmpersand: true,
          allowedContent: true,
          entities_additional: "",
          entities_greek: false,
          // extraAllowedContent: '*[id]'
          //   filebrowserUploadUrl: `http://localhost:5173/ck-gallery`,
          //   filebrowserBrowseUrl: `http://localhost:5173/ck-gallery`,
        }}
      ></CKEditor>
    </div>
  );
}

export default GeneratorCKEditor;
