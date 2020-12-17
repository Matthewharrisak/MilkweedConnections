import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import NewUserFrom from "./NewUserForm";
import NewProviderProfileForm from "./NewProviderProfileForm";
import SuccessDialog from './SuccessDialog';

import './NewUserForm.css'

// steps of MultiForm to navigate between forms
const steps = [
  { id: "user" },
  { id: "profile" },
  { id: "success" }
];

const MultiStepForm = ({ images }) => {
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  switch (id) {
    case "user":
      return <NewUserFrom {...navigation} />;
    case "profile":
      return <NewProviderProfileForm {...navigation}/>;
    case "success":
      return <SuccessDialog />;
    default:
      return null;
  }
};

export default MultiStepForm;