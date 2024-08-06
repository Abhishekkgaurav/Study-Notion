import React from 'react'
import { Link } from 'react-router-dom'

export const CTAButton = ({ children, active, linkto }) => {
    return (
        <Link to={linkto}>
            <div className={`text-center text-[13px] px-6 py-3 rounded font-bold ${active ? 'bg-yellow-50 text-black shadow-custom-inset-yellow' : 'bg-richblack-800 shadow-custom-inset'}
            hover:scale-95 transition-all duration-200

            `}>{children}</div>
        </Link>
    )
}
