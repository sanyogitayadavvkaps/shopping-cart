import {NavLink} from 'react-router-dom'

const PageNotFound = () =>{
    return(
        <div className="container">
    
        <div className="error-page flex flex-col lg:flex-row items-center justify-center h-screen text-center lg:text-left">
            <div className="-intro-x lg:mr-20">  
                {/* <img alt="Midone - HTML Admin Template" className="h-48 lg:h-auto"
                    src="../../assets/admin-assets/dist/images/error-illustration.svg"/> */}
            </div>
            <div className="text-white mt-10 lg:mt-0">
                <div className="intro-x text-8xl font-medium">404</div>
                <div className="intro-x text-xl lg:text-3xl font-medium mt-5">Oops. This page has gone missing.</div>
                <div className="intro-x text-lg mt-3">You may have mistyped the address or the page may have moved.</div>
                <NavLink to="/">
                <button
                    className="intro-x btn py-3 px-4 text-white border-white dark:border-darkmode-400 dark:text-slate-200 mt-10">Back
                    to Home</button>
                </NavLink>
            </div>
        </div>
   
    </div>
    )
}

export default PageNotFound