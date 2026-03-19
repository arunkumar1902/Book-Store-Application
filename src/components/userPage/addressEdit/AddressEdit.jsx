import axios from "axios";
import { useState } from "react";
import { createPortal } from "react-dom";
import { USERDETAILSAPI } from "../../../../public/config/env";
import { useAuth } from "../../auth/AuthProvider";

export default function AddressEdit({userId, address, setAddressEdit}) {

    const auth = useAuth();
    
    const [newAddress, setNewAddress] = useState(address);

     const handleAddressEditCancel = () => {
        if (confirm("Do you want to Cancel?")) {
            setAddressEdit(false);
        }
    }

     const handleNewAddress = async (event) => {
        event.preventDefault();
        try {
            await axios.patch(`${USERDETAILSAPI}/${userId}`, {
                address: newAddress
            });
            alert("Address Updated Successfully");
            setAddressEdit(false);
            auth.fetchUserData(userId);

        } catch (error) {
            alert("Error Occured : ", error.message);
        }
    }

    return (
        createPortal(
            <div className="modal-backdrop">
                <div className="modal">
                    <form onSubmit={handleNewAddress}>
                        <label htmlFor="newAddress"><h3>Enter Your Address</h3></label><br />
                        <input
                            type="text"
                            id='newAddress'
                            placeholder="Enter your Address"
                            value={newAddress}
                            onChange={(event) => setNewAddress(event.target.value)}
                        />
                        <button type='submit'>Save</button>
                        <button type="button" onClick={handleAddressEditCancel}>Cancel</button>
                    </form>
                </div>
            </div>,
            document.getElementById("modal")
        )
    )
}
