import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout';
import { TextField } from '@hilla/react-components/TextField';
import {Notification} from "@hilla/react-components/Notification";

function addingNotification() {
    const notification = Notification.show('Added address. Refreshing content ...', {
        position: 'top-center',
        duration: 4000,
        theme: 'contrast',
    }) ;
    return <></>;
}

export default function AddAddress() {

    async function getAndSendFormData() {
        const formData = new FormData();
        formData.append('addressOne',(document.getElementById('addressOne') as HTMLInputElement).value);
        formData.append('addressTwo',(document.getElementById('addressTwo') as HTMLInputElement).value);
        formData.append('city',(document.getElementById('city') as HTMLInputElement).value);
        formData.append('state',(document.getElementById('state') as HTMLInputElement).value);
        formData.append('country',(document.getElementById('country') as HTMLInputElement).value);
        formData.append('zip',(document.getElementById('zip') as HTMLInputElement).value);

        const jsonObject: { [key: string]: any } = {};
        for (const [key, value] of formData.entries()) {
            jsonObject[key] = value;
        }

        const jsonString = JSON.stringify(jsonObject);

        await fetch('http://localhost:8080/api/address', {
            method: 'POST',
            body: jsonString,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        }).then(response => response.json()).then(data => console.log(data)).catch(error => console.error(error));
        addingNotification();
        setTimeout(() => {
            window.location.reload();
        }, 4000);
    }

    return (
        <div className="d-flex align-items-center justify-content-center p-4">
            <div className="modal fade" id="address-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add Address</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormLayout>
                                <TextField label="Address One" id="addressOne"/>
                                <TextField label="Address Two" id="addressTwo"/>
                                <TextField label="City" id="city"/>
                                <TextField label="State (Two Letters)" id="state" maxlength={2} allowedCharPattern="[a-zA-Z]"/>
                                <TextField label="Country (Two Letters)" id="country" maxlength={2} allowedCharPattern="[a-zA-Z]"/>
                                <TextField label="Zip" id="zip" allowedCharPattern="[0-9()-]"/>
                            </FormLayout>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" onClick={getAndSendFormData} data-bs-dismiss="modal">Add Address</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#address-modal">
                Add Address
            </button>
        </div>
    );
}