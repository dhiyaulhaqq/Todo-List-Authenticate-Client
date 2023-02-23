import { Button } from "reactstrap";

const Authorize = () => {
  const host = "https://sw3yed-3300.csb.app";

  const handleClick = async (event) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${host}/protected`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const data = await response.json();
      console.log("Data received ", data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button className="me-3" onClick={handleClick}>
      Authorize
    </Button>
  );
};

export default Authorize;
