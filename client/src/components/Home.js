import React, {useState, useEffect} from 'react';

const Home = () => {

    const [userName, setUserName] = useState("");
    const [show, setShow] = useState(false);   

    const userHomePage = async () => {
        try {
          const res = await fetch("/getdata", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
    
          const data = await res.json();
          console.log(data);
          setUserName(data.name);
          setShow(true);
        } catch (error) {
          console.log("Error is :-" + error);
        }
      };
    
      useEffect(() => {
     userHomePage();
      }, []);
    
    return (
        <>
            <div className="container">
                <div className="row">
                    <p>WELCOME</p>
                    <h1>{userName}</h1>
                    <h2>{show ? "Happy to see you again ... " : "We are the MERN Developers"}</h2>
                </div>
            </div>            
        </>
    );
}

export default Home;