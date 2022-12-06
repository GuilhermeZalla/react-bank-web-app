export const Transaction = props => {
    return (
        <tr>
            <td>{props.receiver}</td>
            <td>{props.date}</td>
            <td>#{props.id}</td>
            <td>$ {props.amount}</td>
        </tr>
    );
};