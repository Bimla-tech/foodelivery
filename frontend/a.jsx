import { useEffect } from "react";

function a() {

  useEffect(() => {
    fetch("http://localhost:4000/api/test")
      .then(res => res.json())
      .then(data => {
        console.log(data.message);
        alert(data.message);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Frontend Running</h1>
    </div>
  );
}

export default a;