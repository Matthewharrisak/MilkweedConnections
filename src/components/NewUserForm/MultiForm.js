import React from "react";
import { useForm, useStep } from "react-hooks-helper";

import NewUserFrom from "./NewUserForm";
import NewProviderProfileForm from "./NewProviderProfileForm";

const steps = [
  { id: "user" },
  { id: "profile" },
];

const MultiStepForm = ({ images }) => {
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  

  switch (id) {
    case "user":
      return <NewUserFrom {...navigation} />;
    case "profile":
      return <NewProviderProfileForm />;
    default:
      return null;
  }
};

export default MultiStepForm;