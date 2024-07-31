import React from "react";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
    return (
        <div>
            {/* section 1 */}
            <div>
                <Link to={"/signup"} >
                    <div>
                        <div>
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