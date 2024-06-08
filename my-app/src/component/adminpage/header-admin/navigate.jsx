import { NavLink } from "react-router-dom";

const Navigate = () => {
  return (
    <>
      <NavLink to="/admin">Admin</NavLink>
      <NavLink to="/">Home</NavLink>
    </>
  );
};

export default Navigate;