import styles from "./navbar.module.scss";
import logo_webp from "./logo.webp"
import {BsGithub} from 'react-icons/Bs';

function Navbar() {
    return (
        <nav>
            <div className={styles.logo}><img alt={"RVWLogo"} src={logo_webp}/></div>
            <ul>
                <li><a href="#"><BsGithub/></a></li>
            </ul>
        </nav>

    )
}


export default Navbar