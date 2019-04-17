import React from "react";
import Card from "UI/Card";
import CreateAlertForm from "containers/CreateAlert";

export default function Home({ assets, loading, error, createAlert }) {
  if ((loading && !assets.length) || error)
    return (
      <p style={{ textAlign: "center" }}>{error ? error : "Loading data..."}</p>
    );
  return (
    !!assets.length && (
      <Card style={{ margin: "0 auto" }}>
        <Card.Header>New Email Alert</Card.Header>
        <Card.Body>
          <CreateAlertForm assets={assets} handleCreate={createAlert} />
        </Card.Body>
      </Card>
    )
  );
}
