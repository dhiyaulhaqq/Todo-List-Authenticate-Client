import { useState } from "react";
import { Toast, ToastBody, ToastHeader } from "reactstrap";

const InfoToast = ({ title, children }) => {
  const [show, setShow] = useState(true);

  // Automatically close the toast after the specified duration
  setTimeout(() => {
    setShow(false);
  }, 3000);

  // Render the toast only if it's still visible
  return (
    <>
      {show && (
        <Toast className="p-3 mt-2 mb-3 mx-auto">
          <ToastHeader toggle={() => setShow(!show)}>{title}</ToastHeader>
          <ToastBody>{children}</ToastBody>
        </Toast>
      )}
    </>
  );
};

export default InfoToast;
