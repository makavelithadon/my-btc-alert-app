import React from "react";
import Card from "UI/Card";
import Alert from "containers/Alert";

export default function Alerts({ alerts, deleteAlert, updateAlert }) {
  if (!alerts.length)
    return <p style={{ textAlign: "center" }}>You have no alerts to manage.</p>;
  return (
    !!alerts.length && (
      <Card style={{ margin: "0 auto" }}>
        <Card.Header>Manage alerts</Card.Header>
        <Card.Body>
          {alerts.map(alert => (
            <Alert
              key={alert.id}
              alert={alert}
              handleDelete={deleteAlert}
              handleUpdate={updateAlert}
            />
          ))}
        </Card.Body>
      </Card>
    )
  );
}
