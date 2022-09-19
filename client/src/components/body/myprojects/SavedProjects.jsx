/* 
Name of the Module : Projects
Date of Module Creation : 2/10/2021
Author of the module: Jaimin Prajapati
What the module does : show all uploaded projects
Modification history : 
    Card-Bottom Button and Like Button Effect
*/

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchParticularProjects, dispatchGetParticularProjects } from '../../../redux/actions/projectAction';
import { NavLink } from 'react-router-dom'
import './myProjects.css';
import Footer from '../home/Footer';

const MyProjects = () => {

    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);
    const projects = useSelector(state => state.projects);

    const { isAdmin } = auth;

    const [callback] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchParticularProjects(token).then(res => {
            dispatch(dispatchGetParticularProjects(res));
        })
    }, [token, isAdmin, dispatch, callback]);
    
  

    return (
        <>
            <div className="grd-myprojects mt-5 p-5">
                {
                    projects.filter(saved=>saved.saave==1).map(project => {
                        return (
                            <>
                                {/* key={project._id} */}
                                <div className="myCard">

                                    {/* Project detail/overview  */}
                                    <div className="project-detail">

                                        <span><b>{project.title}</b></span>
                                        <br /><br />
                                        <p>{project.overview}</p>
                                        {/* <p>Project Details: Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias, placeat accusantium expedita magni voluptate vel eveniet explicabo error deleniti quia!</p> */}


                                        {/* Project Card Bottom Division Like and Read More  */}
                                        <div className="flx-mycard-bottom">

                                            {/* <div className="d-flex flex-row">
                                                <span className="">
                                                    <i className="bi bi-heart-fill btn pt-2 like-icon"></i> <b>30k</b>
                                                </span>
                                            </div> */}

                                            <NavLink exact to={`/viewproject/${project._id}`}>
                                                <button className="button button-readmore"> <b> Read More </b></button>
                                            </NavLink>

                                        </div>

                                    </div>

                                </div>
                            </>

                        )
                    }

                    )
                }
            </div>
            {/* Using Footer Module on Home Page */}
            {/* <Footer /> */}
        </>
    )
}

export default MyProjects