class Taskbar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div class="header">
        <div class="logo_container">
            <h1>CV<span> TechTeam</span></h1>
        </div>

        <ul class="nav">
            <li><a href="index.html">HOME</a></li>
            <li><a href="request.html">REQUEST</a></li>
            <li><a href="stls.html">STL</a></li>
            <li><a href="learn.html">LEARN</a></li>
            <li><a href="about.html">ABOUT</a></li>
            <li><ion-icon name="sunny-outline" size="large" id="sun"></ion-icon></li>
        </ul>
    </div>
    `
  }

}

customElements.define('cv-taskbar', Taskbar)
