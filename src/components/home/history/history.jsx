import { useEffect, useState } from "react";
import { TbArrowsDownUp } from "react-icons/tb";
import { Transaction } from "./transaction/transaction";

async function getTransactions(username) {
    let response = await fetch(`http://localhost:3000/accountpulling/transaction/${username}`, {
        method: "GET",
        mode: "cors"
    });
    return response.json();
};

export const History = (props) => {
    const [filter, setFilter] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        getTransactions(props.username).then(res => setTransactions(res)).catch(err => console.error(err));
    }, []);

    const handleFilter = e => {
        setFilter(e.target.name);
    };

    return (
        <section id="history" className="history" title="View all your transactions history">
            <h2 className="section__title">History</h2>
            {
                transactions.length === 0 ? <h3>You don't have any transactions yet.</h3> :
                    <table className="section__table">
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>Date <button type="button" name='date' onClick={handleFilter}><TbArrowsDownUp /></button></th>
                                <th>Transaction ID <button type="button" name='id' onClick={handleFilter}><TbArrowsDownUp /></button></th>
                                <th>Amount <button type="button" name='amount' onClick={handleFilter}><TbArrowsDownUp /></button></th>
                            </tr>
                            {
                                transactions.map((transaction, index) => <Transaction key={index} receiver={transaction.creditedAt} date={transaction.date} id={transaction.id} amount={transaction.amount} />)
                            }
                        </tbody>
                    </table>
            }
        </section>
    );
};
