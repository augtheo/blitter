import React from "react";
import { Alert } from "flowbite-react";
import { useState } from "react";
export interface AlertMessage {
  color: string;
  message: {
    title: string;
    content: string;
  };
}

export default function DismissableAlert({ alertMessage }) {
  const [showAlert, setShowAlert] = useState(true);
  console.log(alertMessage);
  const handleAlertDismiss = () => {
    setShowAlert(false);
  };
  return (
    showAlert && (
      <Alert color={alertMessage.color} onDismiss={handleAlertDismiss}>
        <span>
          <p>
            <span className="font-bold"> {alertMessage.message.title} </span>
            {alertMessage.message.content}
          </p>
        </span>
      </Alert>
    )
  );
}
