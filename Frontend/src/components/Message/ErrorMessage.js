import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    // <div class='alert alert-warning' role='alert'>
    //   {error}
    // </div>
    <div className="alert alert-dismissible alert-warning">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <h4 className="alert-heading">Warning!</h4>
      <p className="mb-0">{error}</p>
    </div>
  );
};


export default ErrorMessage;