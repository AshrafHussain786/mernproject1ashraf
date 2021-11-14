import React, { useEffect, useState } from 'react'
import Ashraf from "../images/Ashraf.jpg"
import { useHistory } from "react-router-dom";

const About = () => {    
    const history = useHistory();
    const [userData, setUserData] = useState({});

    const callAboutPage = async () => {
            try {
                const res = await fetch("/about", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
    
                const data = await res.json();
                console.log(data);
                setUserData(data);  
    
                if (!res.status === 200) {
                    const error = new Error(res.error)
                    throw error;
                }
    
            } catch (error) {
                console.log("Error is :-" + error)
                history.push("/login")
            }
        }
    
    useEffect(() => {
        callAboutPage()
    }, [])

    return (
        <>
            <div className="container emp-profile">
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-img">
                                <img src={Ashraf} width="200" height="200" alt="ashraf-pic" />
                            </div>                            
                        </div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className="profile-rating mt-3 mb-5">RANKING: <span> 1/10 </span></p>

                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="true">TimeLine</a>
                                    </li>  
                                </ul>
                            </div>
                        </div>
                        <div className="col=md-2">
                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit profile" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p> WORK LINK </p>
                                <a href="https://www.youtube.com/" target="">Youtube</a> <br />
                                <a href="https://www.facebook.com/" target="">Facebook</a> <br />
                                <a href="https://www.linkedin.com/" target="">LinkedIn</a> <br />
                                <a href="https://www.instagram.com/" target="">Instagram</a> <br />
                                <a href="https://www.figma.com/" target="">Figma</a> <br />
                                <a href="https://twitter.com/" target="">Twitter</a> <br />
                                <a href="https://github.com/" target="">Github</a> <br />
                            </div>
                        </div>
                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">

                                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>User ID</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>123456789</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label>Experience</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>02 Years</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Hourly rate</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>$10/hr</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Total Projects</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>+100</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>English Level</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>Intermediate</p>
                                        </div>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label>Availability</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>One Month</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </>
    )
}

export default About;