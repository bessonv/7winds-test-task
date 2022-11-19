import IconProps from './Icon.types';
import './Icon.style.sass';
import { ReactComponent as File } from './file.svg';
import { ReactComponent as Delete } from './delete.svg';
import { ReactComponent as FirstFolder } from './first-folder.svg';
import { ReactComponent as SecondFolder } from './second-folder.svg';

export default function Icon({ handler, hidden = false, type, className, ...props }: IconProps): JSX.Element {
  let classNames = [`icon ${hidden ? 'icon-hidden' : ''}`, className].join(' ');
  return (
    <button 
      onClick={handler}
      className={classNames}
      {...props}
    >
      { type === 'delete' && <Delete /> }
      { type === 'file' && <File /> }
      { type === 'first-folder' && <FirstFolder /> }
      { type === 'second-folder' && <SecondFolder /> }
    </button>
  );
}
