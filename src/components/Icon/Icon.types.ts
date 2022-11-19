import { DetailedHTMLProps, HTMLAttributes } from "react";

export default interface IconProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  hidden?: boolean;
  type: 'delete' | 'file' | 'first-folder' | 'second-folder';
  handler: () => void;
}
