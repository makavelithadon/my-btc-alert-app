import React from "react";
import Card from "UI/Card";
import Alert from "components/Alert";

export default function Alerts({ alerts, deleteAlert }) {
  if (!alerts.length)
    return (
      <p style={{ textAlign: "center" }}>Vous n'avez pas encore d'alerte</p>
    );
  return (
    !!alerts.length && (
      <Card style={{ margin: "0 auto" }}>
        <Card.Header>Manage alerts</Card.Header>
        <Card.Body>
          {alerts.map(alert => (
            <Alert key={alert.id} alert={alert} handleDelete={deleteAlert} />
          ))}
        </Card.Body>
      </Card>
    )
  );
}
