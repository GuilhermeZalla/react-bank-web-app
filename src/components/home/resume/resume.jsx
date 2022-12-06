import { SiCashapp } from "react-icons/si";

export const Resume = props => {
    return (
        <section id='resume' className="resume" title="Your account details">
            <h2 className="section__title">My Balance</h2>
            <div className="section__div">
                <SiCashapp />
                <article className="section__article">
                    <span>Available Balance</span>
                    <h3 className="section__subtitle" title="Your current balance">${props.balance} <em>USD</em></h3>
                    <a href="#history" title="View all your transactions history">View Transactions</a>
                </article>
            </div>
        </section>
    );
};