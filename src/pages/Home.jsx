import React from "react";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
    return (
        <div>
            {/* section 1 */}
            <div className="relative text-white mx-auto flex flex-col w-11/12 items-center">
                <Link to={"/signup"} >
                    <div className="mx-auto rounded-full bg-richblack-800 font-bold">
                        <div className="">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>
            </div>
            {/* section 2 */}
            {/* section 3 */}
            {/* section 4 */}
        </div>
    )
}

export default Home