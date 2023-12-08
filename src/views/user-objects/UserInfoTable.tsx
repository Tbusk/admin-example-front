import React, {useEffect, useState} from "react";
import {Grid} from "@hilla/react-components/Grid";
import {GridSortColumn} from "@hilla/react-components/GridSortColumn";
import {Notification} from "@hilla/react-components/Notification";
import {FormLayout} from "@hilla/react-components/FormLayout";
import {TextField} from "@hilla/react-components/TextField";
import {Button} from "primereact/button";

export default function UserInfo() {

    /**
     * A function that creates a notification to the user that the user info was successfully updated.
     */
    function updatingNotification() {
        const notification = Notification.show('Updating user info. Refreshing content ...', {
            position: 'top-center',
            duration: 2000,
            theme: 'contrast',
        }) ;
        return <></>;
    }

    /**
     * An interface used to map an object, just like DBO in Java, to collect data from an API and put it into a usable object.
     */
    interface UsersInfo {
        userInfoID: number,
        emailAddress: string,
        firstName: string,
        lastName: string,
        dateOfBirth: Date,
        phoneNumber: string
    }

    // Creates constant variables and setter methods (plus initial values) as an array of the UsersInfo object
    const [usersInfo, setUsersInfo] = useState<UsersInfo[]>([]);
    const [selectedItems, setSelectedItems] = useState<UsersInfo[]>([]);
    const [detailsOpenedItem, setDetailsOpenedItem] = useState<UsersInfo[]>([]);

    // Fetches user info data from the API when page loads and puts it into the usersInfo array
    useEffect(() => {
        async function fetchUsersInfo() {
            try {
                const response = await fetch('http://localhost:8080/api/userinfo/list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const data = await response.json();
                setUsersInfo(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsersInfo();
    }, []);


    /**
     * Collects form field data, converts it to JSON, sends the form data to the backend API, shows a success notification, and reloads the page.
     */
    async function getAndSendFormData(userInfoID:number) {
        const formData = new FormData();
        formData.append('userInfoID',(userInfoID.toString()));
        formData.append('emailAddress',(document.getElementById('emailAddress' + userInfoID) as HTMLInputElement).value);
        formData.append('firstName',(document.getElementById('firstName' + userInfoID) as HTMLInputElement).value);
        formData.append('lastName',(document.getElementById('lastName' + userInfoID) as HTMLInputElement).value);
        formData.append('dateOfBirth',(document.getElementById('dateOfBirth' + userInfoID) as HTMLInputElement).value);
        formData.append('phoneNumber',(document.getElementById('phoneNumber' + userInfoID) as HTMLInputElement).value);


        const jsonObject: { [key: string]: any } = {};
        for (const [key, value] of formData.entries()) {
            jsonObject[key] = value;
        }

        const jsonString = JSON.stringify(jsonObject);
        console.log((document.getElementById('userInfoID') as HTMLInputElement).value);
        console.log(jsonString);

        await fetch('http://localhost:8080/api/userinfo', {
            method: 'PUT',
            body: jsonString,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        }).then(response => response.json()).then(data => console.log(data)).catch(error => console.error(error));

        updatingNotification();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    // Returns a table with a sub-table accessible by clicking on a row to edit values, resize columns, and sort by a column
    return (
        <div className="container-lg p-4 pt-0 pb-3">
            <h3 className="text-center pt-3 pb-3">Users Info Table</h3>
            <Grid items={usersInfo}  selectedItems={selectedItems}
                  onActiveItemChanged={(e) => {
                      const userinfo = e.detail.value;
                      setDetailsOpenedItem(userinfo ? [userinfo] : []);
                  }}  multiSort multiSortPriority="append"
                  style={{height: '500px'}}
                  columnRendering="lazy"
                  detailsOpenedItems={detailsOpenedItem}
                  rowDetailsRenderer={({ item: userinfo}) => (
                      <FormLayout responsiveSteps={[{ minWidth: '0', columns: 3}]}>

                          <TextField label="UserInfoID" value={userinfo.userInfoID.toString()} {...{ colspan: 3}} id={"userInfoID"} hidden={true}></TextField>

                          <label htmlFor={"emailAddress" + userinfo.userInfoID} >Email Address</label>
                          <TextField value={userinfo.emailAddress} {...{ colspan: 3}} id={"emailAddress" + userinfo.userInfoID} contentEditable={true}></TextField>

                          <label htmlFor={"firstName" + userinfo.userInfoID} >First Name</label>
                          <TextField  value={userinfo.firstName} {...{ colspan: 3}} id={"firstName" + userinfo.userInfoID} contentEditable={true}></TextField>

                          <label htmlFor={"lastName" + userinfo.userInfoID} >Last Name</label>
                          <TextField  value={userinfo.lastName} {...{ colspan: 3}} id={"lastName" + userinfo.userInfoID} contentEditable={true}></TextField>

                          <label htmlFor={userinfo.dateOfBirth.toString()} >Date of Birth</label>
                          <TextField  value={userinfo.dateOfBirth.toString()} {...{ colspan: 3}} id={"dateOfBirth" + userinfo.userInfoID} contentEditable={true}></TextField>

                          <label htmlFor={"phoneNumber" + userinfo.userInfoID} >Phone Number</label>
                          <TextField value={userinfo.phoneNumber} id={"phoneNumber" + userinfo.userInfoID} {...{ colspan: 3}} contentEditable={true}></TextField>
                          <div className="pt-3 pb-3">
                              <Button className="btn btn-primary" type="button" onClick={() => getAndSendFormData(userinfo.userInfoID)}>Submit</Button>
                          </div>

                      </FormLayout>
                  )}>
                <GridSortColumn header="UserInfoID" path="userInfoID" autoWidth resizable/>
                <GridSortColumn header="Email Address" path="emailAddress" autoWidth resizable/>
                <GridSortColumn header="First Name" path="firstName" autoWidth resizable/>
                <GridSortColumn header="Last Name" path="lastName" autoWidth resizable/>
                <GridSortColumn header="Date Of Birth" path="dateOfBirth" autoWidth resizable/>
                <GridSortColumn header="Phone Number" path="phoneNumber" autoWidth resizable/>
            </Grid>
        </div>
    );
}