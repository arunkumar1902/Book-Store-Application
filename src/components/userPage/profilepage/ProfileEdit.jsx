import { useState } from 'react'
import AddressEdit from '../addressEdit/AddressEdit';
import ChangePassword from '../changePassword/ChangePassword';
import NewPassword from '../../newPassword/NewPassword';
import { createPortal } from 'react-dom';

export default function ProfileEdit({ userData }) {
    const [changePassword, setChangePassword] = useState(false);
    const [editingNewPassword, setEditingNewPassword] = useState(false);

    // address field
    const [addressEdit, setAddressEdit] = useState(false);

    const handleCancel = ()=>{
        if(confirm("Do you want Cancel ? ")){
            setChangePassword(false);
            setEditingNewPassword(false);
        }
    }

    return (
        <div className='userProfile'>
            <p>Name : {userData.username}</p><br />
            <p>Email : {userData.email}</p><br />

            <div>
                <span>Address : </span>
                <span>{userData.address}</span>
                {addressEdit && <AddressEdit userId={userData.id} address={userData.address} setAddressEdit={setAddressEdit}></AddressEdit>}
            </div>
            <br />

            <div className='userProfileEditButtons'>
                <button onClick={() => setAddressEdit(true)}>Update Address</button>
                <br />
                <button onClick={() => setChangePassword(true)}>Change Password</button>
            </div>

            {changePassword && <ChangePassword password={userData.password} setChangePassword={setChangePassword} setEditingNewPassword={setEditingNewPassword}></ChangePassword>}

            {editingNewPassword && createPortal(
                <div className="modal-backdrop">
                    <div className="modal">
                        <NewPassword userID={userData.id} handleCancel ={ handleCancel}></NewPassword>
                    </div>
                </div>
                , document.getElementById("modal")
            )}

        </div>
    )
}
