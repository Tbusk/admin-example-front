import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout';
import { TextField } from '@hilla/react-components/TextField';
import { Button } from 'primereact/button';
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
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
        <div className="container-lg p-4 pb-2 pt-3">
            <div className="container" >
                <div className="container justify-content-center align-items-center text-center">
                    <h3>Add User Info</h3>
                    <hr/>
                </div>
                <div className="card-body">
                <VerticalLayout theme="spacing">
                    <FormLayout responsiveSteps={responsiveSteps}>
                        <TextField label="Email" id="emailAddress"/>
                        <TextField label="First Name" id="firstName"/>
                        <TextField label="Last Name" id="lastName"/>
                        <TextField label="Date Of Birth" id="dateOfBirth"/>
                        <TextField label="Phone Number" id="phoneNumber"/>
                    </FormLayout>

                    <div className="container d-flex align-items-center justify-content-center">

                        <Button label="Create UserInfo" className="btn btn-primary" size="large" type="submit" onClick={getAndSendFormData}/>

                    </div>
                </VerticalLayout>
                </div>
            </div>
        </div>
    );
}