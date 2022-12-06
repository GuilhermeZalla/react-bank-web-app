import { FiLogOut } from "react-icons/fi";
import { Resume } from "./resume/resume";
import { History } from "./history/history";
import { Transactions } from "./transactions/transactions";
import Cover from "./../../assets/images/cover.png";
import User from "./../../assets/images/user.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

async function getAccount(username) {
    let response = await fetch(`http://localhost:3000/accountpulling/${username}`, {
        method: "GET",
        mode: "cors"
    });
    return response.json();
};

export const Home = () => {
    const [account, setAccount] = useState([]);
    const [updatedBalance, setUpdatedBalance] = useState(0);
    const navigator = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('username')) {
            getAccount(localStorage.getItem('username')).then(res => setAccount(res)).catch(err => console.error(err));
        } else {
            navigator('/validation');
        };
    }, [navigator, updatedBalance]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigator('/validation');
    };

    const handleBalance = () => setUpdatedBalance(1 + updatedBalance);

    return (
        <div className="home-container">
            <figure><img src={Cover} alt="imagem retirada de NG.CASH processo seletivo" /></figure>
            <header className="header">
                <nav className="header__navbar">
                    <ul className="header__list">
                        <li className="header__item"><figure title="User profile picture"><img src={User} alt="User profile" /></figure></li>
                        <li className="header__item"><h1 title="Wellcome to your account home page">Welcome Back, {account.username}!</h1></li>
                        <li className="header__item"><button type="button" onClick={handleLogout} title="Logout from your account"><FiLogOut /></button></li>
                    </ul>
                </nav>
            </header>
            <main className="main">
                <Resume balance={account.balance} />
                <Transactions username={account.username} balance={account.balance} handleBalance={handleBalance} />
                <History username={account.username} />
            </main>
        </div>
    );
};