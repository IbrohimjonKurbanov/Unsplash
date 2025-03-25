import React, { useEffect } from "react";
import FormInput from "./FormInput";
import { Form, useActionData } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

function Modal() {
  const data = useActionData();
  console.log(data);

  useEffect(() => {
    if (data?.emailForReset) {
      sendPasswordResetEmail(auth, data.emailForReset)
        .then(() => {
          document.getElementById("my_modal_1").close();
          toast.success("Verification sended !");
        })
        .catch((error) => {
          const errorMessage = error.message;
          toast.error(errorMessage);
        });
    }
  }, [data]);

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="mb-4 text-lg font-bold text-black">Reset password: </h3>
        <Form method="post">
          <FormInput
            name="email_for_reset"
            placeholder="Enter email"
            type="email"
          />
          <div className="modal-action items-center justify-between">
            <button
              onClick={() => {
                document.getElementById("my_modal_1").close();
              }}
              type="button"
              className="btn btn-secondary"
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </Form>
      </div>
    </dialog>
  );
}

export default Modal;
