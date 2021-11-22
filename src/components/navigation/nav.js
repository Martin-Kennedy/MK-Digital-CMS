import React from "react";
import SlideMenu from './slideMenu.js'

const styleObject = {
    nav: {
        marginLeft: "auto"
    },
    ul: {
        display: "flex",
        padding: "0 35px 0 0",
        justifyContent: "end"
    },
    li: {
        fontFamily: "mr-eaves-modern, sans-serif",
        fontWeight: "100",
        fontSize: "18px",
        margin: "0 15px"
    }
}

const Nav =  (props) => {
    return (
        <nav style={styleObject.nav}>
            <ul style={styleObject.ul}>
                <li style={styleObject.li}>
                    Projects
                </li>
                <li style={styleObject.li}>
                    Contributions
                </li>
                <li style={styleObject.li}>
                    Bio
                </li>
                <li style={styleObject.li}>
                    <SlideMenu />
                </li>
            </ul>
        </nav>
    )
}

export default Nav;