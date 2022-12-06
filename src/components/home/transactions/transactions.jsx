import { useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { RiCoinsLine } from "react-icons/ri";
import { HiCash } from "react-icons/hi";

async function sendCash(username, current_user, balance, amount) {
    let response = await fetch(`http://localhost:3000/accountPulling/update-balance/${username}/${current_user}/${balance}/${amount}`, {
        method: "PATCH",
        mode: "cors"
    });
    return response.json();
};

export const Transactions = props => {
    const [receiverUser, setReceiverUser] = useState('');
    const [transactionAmount, setTransactionAmount] = useState(0);
    let amount = useRef(null);
    let resume = useRef(null);
    let account = useRef(null);
    let payment = useRef(null);
    let progress = useRef(null);
    let transaction = useRef(null);

    const handlePaymentTab = () => {
        if ((Number(props.balance) - Number(amount.current.value) < 0) || amount.current.value === '') {
            window.alert("Inform a valid value.");
        } else {
            setTimeout(() => {
                transaction.current.style.transform = 'translateX(0)';
                progress.current.style.right = '305px';
            }, 100);
            payment.current.style.transform = 'translateX(-900px)';
        };
    };

    const handleTransactionTab = () => {
        setTimeout(() => {
            payment.current.style.transform = 'translateX(0)';
            progress.current.style.right = '620px';
        }, 100);
        transaction.current.style.transform = 'translateX(900px)';
    };

    const handleTransactionCompleted = () => {
        if (account.current.value === props.username || account.current.value === '') {
            window.alert(`You cannot send cash to your own account.`);
        } else {
            setTimeout(() => {
                resume.current.style.transform = 'translateX(0)';
                progress.current.style.right = '30px';
            }, 100);
            transaction.current.style.transform = 'translateX(-900px)';
        };
    };

    const handleTransaction = () => {
        sendCash(account.current.value, props.username, props.balance, amount.current.value).then(res => {
            if (res) {
                setTimeout(() => {
                    resume.current.style.transform = 'translateX(700px)';
                    progress.current.style.right = '620px';
                }, 0);
                payment.current.style.transform = 'translateX(0)';
                amount.current.value = '';
                props.handleBalance();
            } else {
                window.alert(`Account ${account.current.value} was not found.`);
            }
        }).catch(err => console.error(err));
    };

    return (
        <section className="transactions" title="Release a transaction">
            <h2 className="section__title">Transactions</h2>
            <span ref={progress}></span>
            <span className="bar"></span>
            <form className="form" ref={payment}>
                <fieldset>
                    <p>
                        <label htmlFor="amount">Enter your amount</label>
                        <span><input id="amount" type="text" name='amount' placeholder='10,000' maxLength={20} ref={amount} onBlur={() => setTransactionAmount(amount.current.value)} title="inform a value that is higher or equal to your current balance" /></span>
                    </p>
                    <p>
                        <button type="button" title="Click to pay something" onClick={handlePaymentTab}>Pay <RiCoinsLine /></button><button type="button" title="Click to deposit to someone">Deposit <AiOutlinePlus /></button>
                    </p>
                </fieldset>
            </form>
            <form className="form" ref={transaction}>
                <fieldset>
                    <legend onClick={() => handleTransactionTab()}>return</legend>
                    <p>
                        <label htmlFor="account">Inform the receiver</label>
                        <input id='account' type="text" name='account' placeholder='randomuser1234' ref={account} onBlur={() => setReceiverUser(account.current.value)} />
                    </p>
                    <p>
                        <button type="button" onClick={handleTransactionCompleted}>Confirm Transaction <HiCash /></button>
                    </p>
                </fieldset>
            </form>
            <article className="resume" ref={resume}>
                <h2 className="article__title">Your transaction resume</h2>
                <table>
                    <tbody>
                        <tr>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Amount</th>
                            <th>Sender Balance</th>
                        </tr>
                        <tr>
                            <td>{props.username}</td>
                            <td>{receiverUser}</td>
                            <td>$ {transactionAmount}</td>
                            <td>$ {(Number(props.balance) - transactionAmount)}</td>
                        </tr>
                    </tbody>
                </table>
                <button type="button" name='finish' onClick={handleTransaction}>Finish Transaction</button>
            </article>
        </section>
    );
};