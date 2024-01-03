import React, { useState } from 'react';

const UserDetailsItem = ({ name, email, phone }) => (
  <div>
    <h2>User Details</h2>
    <p>Name: {name}</p>
    <p>Email: {email}</p>
    <p>Phone: {phone}</p>
  </div>
);

const UserDetails = ({ user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  
  return (
    <div>
      <div onClick={handleClick}>
        <p>User: {user.name}</p>
      </div>

      {showDetails && (
        <div>
          <UserDetailsItem {...user} />
          <button onClick={handleClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
