import React from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout';
import { TextField } from '@hilla/react-components/TextField';
import { PasswordField } from '@hilla/react-components/PasswordField';
import { Button } from 'primereact/button';
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
import {Notification} from "@hilla/react-components/Notification";
import { Accordion, AccordionTab } from 'primereact/accordion';


function addingNotification() {
    const notification = Notification.show('Added user. Refreshing content ...', {
        position: 'top-center',
        duration: 4000,
        theme: 'contrast',
    }) ;
    return <></>;
}

export default function AddUser() {

    const responsiveSteps = [
        { minWidth: '0', columns: 1 },
        { minWidth: '500px', columns: 2 },
        { minWidth: '750px', columns: 3 },
    ];

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

    return (
        <div className="container-lg p-4 pb-2 pt-3">
            <div className="container" >
                <div className="container justify-content-center align-items-center text-center">
                    <h3>Create User</h3>
                    <hr/>
                </div>
                <div className="card-body">
                        <VerticalLayout theme="spacing">
                            <FormLayout responsiveSteps={responsiveSteps}>
                                <TextField label="UserInfoID" id="userInfoID"/>
                                <TextField label="AddressID" id="addressID"/>
                                <TextField label="Username" id="username"/>
                                <PasswordField label="Password" id="password"/>
                                <PasswordField label="Confirm password" />
                                <TextField label="Role" id="role"/>
                            </FormLayout>

                            <div className="container d-flex align-items-center justify-content-center">

                                <Button label="Create User" className="btn btn-primary" size="large" type="submit" onClick={getAndSendFormData}/>

                            </div>
                        </VerticalLayout>
                </div>
            </div>
        </div>
    );
}