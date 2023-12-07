import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout';
import { TextField } from '@hilla/react-components/TextField';
import {Notification} from "@hilla/react-components/Notification";

function addingNotification() {
    const notification = Notification.show('Added user info. Refreshing content ...', {
        position: 'top-center',
        duration: 4000,
        theme: 'contrast',
    }) ;
    return <></>;
}

export default function AddUserInfo() {

    const responsiveSteps = [
        { minWidth: '0', columns: 1 },
        { minWidth: '500px', columns: 2 },
        { minWidth: '750px', columns: 3 },
    ];

    async function getAndSendFormData() {
        const formData = new FormData();
        formData.append('emailAddress',(document.getElementById('emailAddress') as HTMLInputElement).value);
        formData.append('firstName',(document.getElementById('firstName') as HTMLInputElement).value);
        formData.append('lastName',(document.getElementById('lastName') as HTMLInputElement).value);
        formData.append('dateOfBirth',(document.getElementById('dateOfBirth') as HTMLInputElement).value);
        formData.append('phoneNumber',(document.getElementById('phoneNumber') as HTMLInputElement).value);

        const jsonObject: { [key: string]: any } = {};
        for (const [key, value] of formData.entries()) {
            jsonObject[key] = value;
        }

        const jsonString = JSON.stringify(jsonObject);

        await fetch('http://localhost:8080/api/userinfo', {
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
            <div className="modal fade" id="userinfo-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add User Info</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormLayout responsiveSteps={responsiveSteps}>
                                <TextField label="Email" id="emailAddress"/>
                                <TextField label="First Name" id="firstName"/>
                                <TextField label="Last Name" id="lastName"/>
                                <TextField label="Date Of Birth" id="dateOfBirth" typeof="date"/>
                                <TextField label="Phone Number" id="phoneNumber"  allowedCharPattern="[0-9()+-]"/>
                            </FormLayout>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" onClick={getAndSendFormData} data-bs-dismiss="modal">Add User</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#userinfo-modal">
                Add User Info
            </button>
        </div>
    );
}