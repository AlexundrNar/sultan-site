import { FC } from "react";
import "../style/modal-dash.scss"

interface IModal {
  active: boolean
  setActive: Function,
  children: React.ReactNode,
}

const ModalDash: FC<IModal> = ({ active, setActive, children }) => {
  return (
    <div className={active ? "modal active" : "modal"}>
      <div
        className={active ? "modal__content modal__content-active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalDash;
