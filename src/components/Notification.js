import React from "react";

export const Notification = ({ msg }) => {
    const notificationStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16,
        margin: 2,
        padding: 10
      }

  if (msg === null) {
    return null;
  }

  return <div style={notificationStyle} className="error">{msg}</div>;
};