import SideBarProps from "./Sidebar.types"
import './Sidebar.style.sass';
import { ReactComponent as ArrowIcon } from './arrow-down.svg';
import { ReactComponent as SquareIcon } from './square.svg';

export default function SideBar({}: SideBarProps): JSX.Element {
  return (
    <div className="sidebar">
      <header className="sidebar__title">
        <div className="sidebar__title_large">Название проекта</div>
        <div className="sidebar__title_small">Аббревиатура</div>
      </header>
      <ul className="sidebar__list">
        <li>По проекту</li>
        <li>Объекты</li>
        <li>РД</li>
        <li>МТО</li>
        <li className="sidebar__list-focus">СМР</li>
        <li>График</li>
        <li>МиМ</li>
        <li>Рабочие</li>
        <li>Капвложения</li>
        <li>Бюджет</li>
        <li>Финансирование</li>
        <li>Панорамы</li>
        <li>Камеры</li>
        <li>Поручения</li>
        <li>Контрагенты</li>
      </ul>
    </div>
  )
}
