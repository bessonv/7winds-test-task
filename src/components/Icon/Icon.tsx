import IconProps from './Icon.types';
import './Icon.style.sass';
import { ReactComponent as FileIcon } from './file.svg';
import { ReactComponent as DeleteIcon } from './delete.svg';
import { ReactComponent as FirstFolderIcon } from './first-folder.svg';
import { ReactComponent as SecondFolderIcon } from './second-folder.svg';

export default function Icon({ handler, hidden = false, type, className, ...props }: IconProps): JSX.Element {
  let classNames = [`icon ${hidden ? 'icon-hidden' : ''}`, className].join(' ');
  return (
    <button 
      onClick={handler}
      className={classNames}
      {...props}
    >
      { type === 'delete' && <DeleteIcon /> }
      { type === 'file' && <FileIcon /> }
      { type === 'first-folder' && <FirstFolderIcon /> }
      { type === 'second-folder' && <SecondFolderIcon /> }
    </button>
  );
}
