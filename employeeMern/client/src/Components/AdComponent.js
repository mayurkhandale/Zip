import React, { useState, useEffect } from "react";
const AdComponent = ({ adContent }) => {
  return (
    <div className="ad-container  fullscren">
      {adContent ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: adContent }} />
        </>
      ) : (
        <p>Ad content goes here</p>
      )}
    </div>
  );
};

export default AdComponent;
