import HeaderProps from "./Header.types";
import './Header.style.sass';
import { ReactComponent as ArrowIcon } from './arrow.svg';
import { ReactComponent as SquaresIcon } from './squares.svg';


export default function Header({}: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <SquaresIcon />
      <ArrowIcon />
      <div className="header__element header__element-focus">Просмотр</div>
      <div className="header__element">Управление</div>
    </header>
  )
}
