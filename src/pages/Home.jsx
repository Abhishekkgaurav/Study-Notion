import React from "react";
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";
import { HighLightText } from "../components/core/HomePage/HighLightText";
import { CTAButton } from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4"
import { CodeBlocks } from "../components/core/HomePage/CodeBlocks";

const Home = () => {
    return (
        <div>
            {/* section 1 */}
            <div className="relative max-w-maxContent text-white mx-auto flex flex-col w-11/12 items-center">
                <Link to={"/signup"}>
                    <div className="group mt-16 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200  hover:scale-95">
                        <div className="group-hover:bg-richblack-900 flex gap-2 items-center justify-center px-4 py-2">
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className="mt-7 text-center text-4xl font-semibold">Empower Your Future With
                    <HighLightText text={"Coding Skills"}></HighLightText>
                </div>

                <div className="w-[90%] text-center text-lg font-bold mt-4  text-richblack-300 ">
                    With our online coding courses, you can learn at your own pace, from
                    anywhere in the world, and get access to a wealth of resources,
                    including hands-on projects, quizzes, and personalized feedback from
                    instructors.
                </div>

                <div className="flex flex-row gap-7 mt-8 ">
                    <CTAButton linkto={"/signup"} active={true}>Learn More</CTAButton>
                    <CTAButton linkto={"/login"} active={false}>Book a Demo</CTAButton>
                </div>

                <div className="mx-3 my-12 shadow-blue-200 ">
                    <video
                        muted loop autoPlay
                    >
                        <source src={Banner} type="video/mp4" />
                    </video>

                </div>

                {/* code section 1 */}

                <div>
                    <CodeBlocks position={'lg:flex-row'} heading={
                        <div className="text-4xl font-bold">
                            Unlock Your
                            <HighLightText text={"coding potential"}></HighLightText>
                            with our online courses
                        </div>

                    }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={{
                            btnText: "Try it Yourself",
                            linkto: "/signup",
                            active: true
                        }}
                        ctabtn2={{
                            btnText: "learn more",
                            linkto: "/login",
                            active: false
                        }}

                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        codeColor={'text-yellow-25'}
                    ></CodeBlocks>
                </div>


                {/* code section 2 */}

                <div>
                    <CodeBlocks position={'lg:flex-row-reverse'} heading={
                        <div className="text-4xl font-bold">
                            Start
                            <HighLightText text={"coding"}></HighLightText>
                            <br />
                            <HighLightText text={"in seconds"}></HighLightText>

                        </div>

                    }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={{
                            btnText: "Continue Lesson",
                            linkto: "/signup",
                            active: true
                        }}
                        ctabtn2={{
                            btnText: "learn more",
                            linkto: "/login",
                            active: false
                        }}

                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
                        codeColor={'text-yellow-25'}
                    ></CodeBlocks>
                </div>




            </div>
            {/* section 2 */}
            {/* section 3 */}
            {/* section 4 */}
        </div>
    )
}

export default Home