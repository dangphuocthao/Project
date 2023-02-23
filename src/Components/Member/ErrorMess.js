
function ErrMess(props) {
    const err = props.err;
    const renderErr =() => {
        if(err.lenght > 0){
            return(err.map((value, key) => {
                return(
                    <li key={key}>{err[value]}</li>
                )
            }))
        }
    }
    return(
        <>
            <ul>
                {renderErr()}
            </ul>
        </>
    )
}
export default ErrMess;