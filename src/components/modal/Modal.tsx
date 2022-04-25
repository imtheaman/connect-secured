import { ReactElement, ReactNode } from "react";
import { createPortal } from "react-dom";

const Modal: React.FC<{
  className?: string;
  showModal: (arg: false | ReactNode) => any;
  children: ReactNode;
}> = ({
  children,
  className,
  showModal,
  ...otherProps
}): ReactElement | null => {
  if (!document.getElementById("modal")) {
    console.error("div with id `modal` is not defined in the html");
  }
  return createPortal(
    <div id="modal-container" onClick={(e) => showModal(false)}>
      <div
        id="modal-div"
        onClick={(e) => e.stopPropagation()}
        className={`${className ? className : ""}`}
        {...otherProps}
      >
        <div id="modal-btn" onClick={(e) => showModal(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div id="modal-content">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
};

export default Modal;
