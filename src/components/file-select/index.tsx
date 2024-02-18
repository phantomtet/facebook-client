import { ChangeEvent, forwardRef, useImperativeHandle, useRef } from "react";

interface I_Props {
  onSelect: (file: FileList) => void;
  multiple?: boolean;
}
export interface I_FileSelectHandler {
  open: () => void;
}
const FileSelect = forwardRef<I_FileSelectHandler, I_Props>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>();
  const open = () => {
    inputRef.current.click();
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.onSelect(e.target.files);
  };
  useImperativeHandle(
    ref,
    () => ({
      open,
    }),
    []
  );
  return (
    <input
      multiple={props.multiple}
      hidden
      type="file"
      ref={inputRef}
      onChange={onChange}
    />
  );
});
export default FileSelect;
