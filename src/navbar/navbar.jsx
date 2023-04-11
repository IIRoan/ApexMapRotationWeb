import styles from "./navbar.module.scss";
import logo_webp from "./logo.webp"
import {TfiGithub} from 'react-icons/Tfi';

function Navbar() {
    return (
        <nav>
            <div className={styles.logo}><img alt={"RVWLogo"} src={logo_webp}/></div>
            <ul>
                <li><a href="https://github.com/IIRoan/ApexMapRotationWeb"><TfiGithub/></a></li>
            </ul>
        </nav>

    )
}


export default Navbar