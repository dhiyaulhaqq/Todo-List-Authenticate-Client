import { Button } from "reactstrap";

const Logout = () => {
  const handleClick = () => {
    localStorage.removeItem("token");
    console.log("User logged out successfully");
  };

  return <Button onClick={handleClick}>Logout</Button>;
};

export default Logout;
