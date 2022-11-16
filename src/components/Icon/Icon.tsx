import IconProps from './Icon.types';

export default function Icon({ handler, isHidden, type }: IconProps): JSX.Element {

  return (
    <button 
      onClick={handler} 
      className={'Icon '+(isHidden)?'Icon-hidden':''}
    >
      { type === 'delete' && <img src='delete' alt='delete'/> }
      { type === 'create' && <img src='create' alt='delete'/> }
    </button>
  );
}
