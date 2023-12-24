import React from 'react';

const QuicksightDashboard = () => {
  // Fetch and display the QuickSight dashboard here
  return (
    <div>
      <h2>SMGB Users and Scanning Analytics</h2>
      {
   <iframe
   width="1680"
   height="1000"
   src="https://us-east-1.quicksight.aws.amazon.com/embed/8dd17521e5eb4d8a8e1b55cf45f2d13f/dashboards/78ef0f77-beef-456d-9731-b4ef0de26647">
  </iframe>
    }
    </div>
  );
};

export default QuicksightDashboard;