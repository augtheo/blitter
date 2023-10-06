import React, { useEffect, useState } from "react";
import { Alert } from "flowbite-react";

export interface AlertMessage {
  hidden: boolean;
  color: string;
  message: {
    title: string;
    content: string;
  };
}

export default function DismissableAlert({ alertMessage }) {
  const [hideAlert, setHideAlert] = useState(alertMessage.hidden);
  const handleAlertDismiss = () => {
    setHideAlert(true);
  };
  useEffect(() => {
    setTimeout(() => setHideAlert(true), 3000);
  }, []);
  return (
    !hideAlert && (
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
