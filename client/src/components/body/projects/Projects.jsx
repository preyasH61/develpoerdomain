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
import { fetchAllProjects, dispatchGetAllProjects } from '../../../redux/actions/projectAction';
import { NavLink } from 'react-router-dom'
import './projects.css'
import Footer from '../home/Footer';

const Projects = () => {

    const auth = useSelector(state => state.auth);
    const token = useSelector(state => state.token);
    const projects = useSelector(state => state.projects);
    const [sorts, setsorts] = useState(0)

    const { isAdmin } = auth;
    const [callback] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        fetchAllProjects(token).then(res => {
            dispatch(dispatchGetAllProjects(res));
        })
    }, [token, isAdmin, dispatch, callback]);

    console.log(projects)
    function bydate(a, b) {

        if (sorts == 0) {
            return new Date(a.updatedAt).valueOf() - new Date(b.updatedAt).valueOf();
        } else {
            return new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf();
        }
    }
    return (
        <>
            <div className="projects-main-container">

                {/* sort and filter */}
                <div className="filter_menu mt-5 p-3 row align-items-end">
                    <div className="row col-2 px-3">
                        <span>Filters: </span>
                        <select value={sorts} onChange={e => setsorts(e.target.value)} >
                            <option value='#'>--Filter--</option>
                            <option value='1'>Newest</option>
                            <option value='0'>Oldest</option>
                        </select>
                    </div>

                    <div className="row sort  col-2 px-3">
                        <span>Sort By: </span>
                        <select value={sorts} onChange={e => setsorts(e.target.value)} >
                            <option value='#'>--Sort By--</option>
                            <option value='1'>Newest</option>
                            <option value='0'>Oldest</option>
                        </select>
                    </div>
                </div>

                <div className="grd-project mt-2 p-2">
                    {
                        projects.sort(bydate).map(project => {
                            return (
                                <>
                                    {/* key={project._id} */}
                                    <div className="PCard">


                                        {/* Project detail/overview  */}
                                        <div className="project-detail">

                                            <span><b>{project.title}</b></span>
                                            <br /><br />
                                            <p>{project.overview}</p>

                                        </div>

                                        <div className="flx-card-bottom">

                                            <div className="d-flex flex-row">
                                                <button className="like-button">
                                                    <i className="bi bi-heart-fill btn pt-2 like-icon"></i> <b>{project.likes}</b>
                                                </button>
                                            </div>

                                            <NavLink exact to={`/joinproject/${project._id}`}>
                                                <button className="button button-readmore"> <b> Read More </b></button>
                                            </NavLink>
                                        </div>

                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>

            {/* Using Footer Module on Home Page */}
            {/* <Footer /> */}
        </>
    )
}

export default Projects