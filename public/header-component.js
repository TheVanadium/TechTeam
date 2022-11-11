//This JS code is a header component

var locationToken = '<li><a href="stls.html">STLS</a></li>';
var locationToken2;

if (window.location.href.includes("public/task.html")) {
    locationToken = '<li><a href="profile.html">PROFILE</a></li>';
    locationToken2 =
        '<li><ion-icon name="log-out-outline" size="large" id="out"></ion-icon></li>';
} else if (window.location.href.includes("public/profile.html")) {
    locationToken = '<li><a href="task.html">TASK</a></li>';
    locationToken2 =
        '<li><ion-icon name="log-out-outline" size="large" id="out"></ion-icon></li>';
}

const headerTemplate = document.createElement("template");
headerTemplate.innerHTML = `

<style>
body{
    margin: 0;
    user-select: none;
}

body::-webkit-scrollbar {
    width: 0.6em;
}

body::-webkit-scrollbar-track {
    margin-block-end: 5px;
}

body::-webkit-scrollbar-thumb {
    background: #424242;
    border-radius: 100px;
}

body::-webkit-scrollbar-thumb:hover {
    background: #aaaaaa;
}

.header{
    margin: 0px;
    min-width: 100%;
    height: 100px;
    background-color: #171717;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 3;
    user-select: none;
    font-family: 'Poppins', sans-serif;
    outline: #7c7c7c solid 2px;
}

.logo_container{
    padding-left: 3%;
    align-self: center;
}

.logo_container h1{
    color:white;
    font-size: 50px;
    font-weight: 100;
}

.logo_container h1 span{
    font-weight: 900;
}

.nav{
    margin: 0;
    padding-right: 3%;
    list-style: none;
    display: flex;
    align-items: center;
    font-size: 18px;
}

.nav a{
    text-decoration: none;
    color: #fff;
    display:block;
    padding: 5px;
}

.nav a:hover{
    transition: all 0.3s ease-in-out;
    color: #9c9c9c;
    /* transform: rotate(366deg); */
    /* font-size: 22px; */
    padding: 5px;
}

.nav li{
    margin-left: 25px;
    font-size: 1.5rem;
}


.nav ion-icon{
    display: block;
    align-items: center;
    color:#fff;
    cursor: pointer;
}

.nav #sun:hover{
    animation-name: sun;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
}

.nav #out
{
    transition: 0.5s;
}

.nav #out:hover
{
    transition: 0.5s;
    color: red;
}

@keyframes sun{

    20%{
        transform: rotate(0deg);
        color: #fff;
    }

    70%{
        transform: rotate(370deg);
        color: #fff;
    }
    100%
    {
        transform: scale(1.3);
        color: #ffd900;
    }
}

</style>











<div class="header">
        <div class="logo_container">
            <h1>TechTeam<span> Learn</span></h1>
        </div>

        <ul class="nav">
            <li><a href="index.html">HOME</a></li>
            <li><a href="request.html">REQUEST</a></li>
            ${locationToken}
            <li><a href="learn.html">LEARN</a></li>
            <li><a href="about.html">ABOUT</a></li>
            <li><ion-icon name="sunny-outline" size="large" id="sun"></ion-icon></li>
            ${locationToken2}
        </ul>
        </div>
`;

class Header extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();
    }

    connectedCallback() {
        const shadowRoot = this.attachShadow({ mode: "open" });
        shadowRoot.appendChild(headerTemplate.content);
    }
}

customElements.define("header-component", Header);
//sign out
const out = document.querySelector("#out");
out.addEventListener("click", function () {
    signOut(auth)
        .then(() => {
            // Sign-out successful.
        })
        .catch((error) => {
            // An error happened.
        });
});
