import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout';
import { TextField } from '@hilla/react-components/TextField';
import { PasswordField } from '@hilla/react-components/PasswordField';
import {Notification} from "@hilla/react-components/Notification";

/**
 * A function that creates a notification to the user that the user was successfully added.
 */
function addingNotification() {
    const notification = Notification.show('Added user. Refreshing content ...', {
        position: 'top-center',
        duration: 4000,
        theme: 'contrast',
    }) ;
    return <></>;
}

export default function AddUser() {

    /**
     * Collects form field data, converts it to JSON, sends the form data to the backend API, shows a success notification, and reloads the page.
     */
    async function getAndSendFormData() {
        const formData = new FormData();
        formData.append('userInfoID',(document.getElementById('userInfoID') as HTMLInputElement).value);
        formData.append('addressID',(document.getElementById('addressID') as HTMLInputElement).value);
        formData.append('username',(document.getElementById('username') as HTMLInputElement).value);
        formData.append('password',(document.getElementById('password') as HTMLInputElement).value);
        formData.append('role',(document.getElementById('role') as HTMLInputElement).value);

        const jsonObject: { [key: string]: any } = {};
        for (const [key, value] of formData.entries()) {
            jsonObject[key] = value;
        }

        const jsonString = JSON.stringify(jsonObject);

        await fetch('http://localhost:8080/api/user', {
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

    // Returns a modal with form fields for adding a user
    return (
        <div className="d-flex align-items-center justify-content-center p-4">
            <div className="modal fade" id="user-modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <FormLayout>
                                <TextField label="UserInfoID" id="userInfoID"/>
                                <TextField label="AddressID" id="addressID"/>
                                <TextField label="Username" id="username"/>
                                <PasswordField label="Password" id="password"/>
                                <PasswordField label="Confirm password" />
                                <TextField label="Role" id="role"/>
                            </FormLayout>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary" onClick={getAndSendFormData} data-bs-dismiss="modal">Add User</button>
                        </div>
                    </div>
                </div>
            </div>
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#user-modal">
                Add User
            </button>
        </div>
    );
}