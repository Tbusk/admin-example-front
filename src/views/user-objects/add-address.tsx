import React, {useState} from 'react';
import { FormLayout } from '@hilla/react-components/FormLayout';
import { TextField } from '@hilla/react-components/TextField';
import { PasswordField } from '@hilla/react-components/PasswordField';
import { Button } from 'primereact/button';
import {VerticalLayout} from "@hilla/react-components/VerticalLayout";
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

    const responsiveSteps = [
        { minWidth: '0', columns: 1 },
        { minWidth: '500px', columns: 2 },
        { minWidth: '750px', columns: 3 },
    ];

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
        <div className="container-lg p-4 pb-2 pt-3">
            <div className="container" >
                <div className="container justify-content-center align-items-center text-center">
                    <h3>Add Address</h3>
                    <hr/>
                </div>
                <div className="card-body">
                <VerticalLayout theme="spacing">
                    <FormLayout responsiveSteps={responsiveSteps}>
                        <TextField label="Address One" id="addressOne"/>
                        <TextField label="Address Two" id="addressTwo"/>
                        <TextField label="City" id="city"/>
                        <TextField label="State" id="state"/>
                        <TextField label="Country" id="country"/>
                        <TextField label="Zip" id="zip"/>
                    </FormLayout>

                    <div className="container d-flex align-items-center justify-content-center">

                        <Button label="Create Address" className="btn btn-primary" size="large" type="submit" onClick={getAndSendFormData}/>

                    </div>
                </VerticalLayout>
                </div>
            </div>
        </div>
    );
}