
import { useParams } from "react-router-dom";
import ErrMess from "../../Member/ErrorMess";
function Comment(props) {
    const handleSubmitForm = props.handleSubmit;
    const handleInputs = props.handleInputs;
    const err = props.err;
    const inputs = props.inputs;
    
    return(
        <>   
        <ErrMess err ={err}/>
        <div className="col-sm-9">
        
            <div className="replay-box">
                    <div className="text-area">
                        <form onSubmit={handleSubmitForm}>
                        <span>*</span>
                        <textarea name="message" rows={5} value = {inputs} onChange= {handleInputs} />
                        <p>{err?.comment}</p>
                        <button type="submit" className="btn btn-primary" >Post comment</button>
                        </form>
                    </div>
            </div>
        </div>

        </>
    )
}
export default Comment;