import { useState } from "react";
import { useModal } from "~/hooks";

const useForm = (initalValue = {}) => {
  const { closeModal } = useModal();
  const [details, setDetails] = useState(initalValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e, submitAction) => {
    e.preventDefault();
    submitAction(details);
    closeModal();
    console.log("Details from useForm", details);
  };

  return { details, setDetails, handleChange, handleSubmit };
};

export default useForm;
