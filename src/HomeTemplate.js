import './ReactComponents/CSS/HomeTemplate.css';

function HomeTemplate() {
    return (
        <div class="home-template-container">
            <nav>
                <a href="#" onClick={handle_log_out}>Log out</a>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
            </nav>
        </div>
    );
}

const handle_log_out = () => {
    console.log("Log out button clicked");
    localStorage.clear();
    window.location.href = "/";
}

export default HomeTemplate;
