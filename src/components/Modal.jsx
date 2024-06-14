import { HiXMark } from "react-icons/hi2";

export const openModal = () => {
  document.getElementById("myModal").showModal();
};

export const closeModal = () => {
  document.getElementById("closeBtn").click();
};

const Modal = ({ children }) => {
  return (
    <div>
      <dialog id="myModal" className="modal modal-bottom sm:modal-middle ">
        <div className="modal-box pb-8 bg-white">
          <form method="dialog" className="text-end">
            <button id="closeBtn">
              <HiXMark size={25} />
            </button>
          </form>
          <div>{children}</div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
