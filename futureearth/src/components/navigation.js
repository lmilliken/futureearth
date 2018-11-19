import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/pegasus-admin-2018">Admin</NavLink>
      <NavLink to="/pegasus-form-2018">Form</NavLink>
    </div>
  );
};

export default Navigation;
