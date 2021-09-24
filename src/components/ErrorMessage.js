import React from 'react'

const ErrorMessage = ({ error }) => (
  <div className='loadingSceen'>
    <div className='errorMessage active'>
      Oh no! The following error occured: {error.toString()}
    </div>
  </div>
)

export default ErrorMessage
