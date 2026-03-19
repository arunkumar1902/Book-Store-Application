import { useState } from "react";
import { createPortal } from "react-dom";


export default function ChangePassword({setEditingNewPassword, password, setChangePassword}) {

    const [currentPassword, setCurrentPassword] = useState('');
    
    const handleCurrentPasswordSubmit = (event) => {
        event.preventDefault();
        if (password === currentPassword) {
            setEditingNewPassword(true);
            setChangePassword(false);
        } else {
            alert("Wrong Password, try again");
        }
    }

    const handleCancel = () => {
        if (confirm("Do you want Cancel ?")) {
            setChangePassword(false);
        }
    }

    return (
        createPortal(<div className='modal-backdrop'>
            <div className="modal">
                <form onSubmit={handleCurrentPasswordSubmit} className='passwordContainer'>
                    <h3>Current Password</h3> <hr /><br />
                    <div>
                        <label htmlFor="currentPassword">Password : </label>
                        <input
                            type="password"
                            id='currentPassword'
                            placeholder="Enter Password"
                            value={currentPassword}
                            onChange={(event) => setCurrentPassword(event.target.value)}
                            required
                        />
                    </div><br />

                    <div className='buttonContainer'>
                        <button type='submit'>Submit</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>,
        document.getElementById("modal")
    ))
}
