
import Login from "./Login";
import Register from "./Register";

function Member() {
    return (
        <>
        {<Login/>}
        <div className="col-sm-1">
            <h2 className="or">OR</h2>
        </div>
        {<Register/>}
        </>
    )
}
export default Member;