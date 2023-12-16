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
   src="https://us-east-1.quicksight.aws.amazon.com/sn/embed/share/accounts/330775944914/dashboards/78ef0f77-beef-456d-9731-b4ef0de26647?directory_alias=mhaider">
</iframe>
    }
    </div>
  );
};

export default QuicksightDashboard;
