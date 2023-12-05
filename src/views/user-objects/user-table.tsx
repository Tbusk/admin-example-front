import {Grid} from "@hilla/react-components/Grid";
import {GridSortColumn} from "@hilla/react-components/GridSortColumn";
import React, {useEffect, useState} from "react";
import {GridColumn} from "@hilla/react-components/GridColumn.js";
import {Icon} from "@hilla/react-components/Icon";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import {FormLayout} from "@hilla/react-components/FormLayout";
import {TextField} from "@hilla/react-components/TextField";
import {Notification} from "@hilla/react-components/Notification";



export default function UserTable() {

    function addingNotification() {
        const notification = Notification.show('Updating user. Refreshing content ...', {
            position: 'top-center',
            duration: 2000,
            theme: 'contrast',
        }) ;
        return <></>;
    }

    interface Users {
        userID: number,
        userInfoID: number,
        addressID: number,
        username: string,
        role: string,
        active: boolean,
        createdAt: Date
    }

    const [users, setUsers] = useState<Users[]>([]);
    const [selectedItems, setSelectedItems] = useState<Users[]>([]);
    const [detailsOpenedItem, setDetailsOpenedItem] = useState<Users[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await fetch('http://localhost:8080/api/user/list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchUsers();
    }, []);

    async function getAndSendFormData(userID:number) {
        const formData = new FormData();
        formData.append('userID',(document.getElementById('userID') as HTMLInputElement).value);
        formData.append('userInfoID',(document.getElementById('userInfoID' + userID) as HTMLInputElement).value);
        formData.append('addressID',(document.getElementById('addressID' + userID) as HTMLInputElement).value);
        formData.append('username',(document.getElementById('username' + userID) as HTMLInputElement).value);
        formData.append('role',(document.getElementById('role' + userID) as HTMLInputElement).value);
        formData.append('active',(document.getElementById('active' + userID) as HTMLInputElement).value);

        const jsonObject: { [key: string]: any } = {};
        for (const [key, value] of formData.entries()) {
            jsonObject[key] = value;
        }

        const jsonString = JSON.stringify(jsonObject);
        console.log(jsonString);

        await fetch('http://localhost:8080/api/user', {
            method: 'PUT',
            body: jsonString,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        }).then(response => response.json()).then(data => console.log(data)).catch(error => console.error(error));

        addingNotification();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    return (
        <div className="container-lg p-4 pb-3 pt-0">
            <h3 className="text-center pt-3 pb-3">Users Table</h3>

            <Grid items={users}
                  selectedItems={selectedItems}
                  onActiveItemChanged={(e) => {
                      const user = e.detail.value;
                      setDetailsOpenedItem(user ? [user] : []);
                  }}
                  multiSort multiSortPriority="append"
                  columnRendering="lazy"
                  detailsOpenedItems={detailsOpenedItem}
                  rowDetailsRenderer={({ item: user}) => (
                      <FormLayout responsiveSteps={[{ minWidth: '0', columns: 3}]} className="m-0">
                          <TextField label="UserID" value={user.userID.toString()} {...{ colspan: 3}} id={"userID"} hidden={true}></TextField>

                          <label htmlFor={"userInfoID" + user.userID}>UserInfoID</label>
                          <TextField value={user.userInfoID.toString()} {...{ colspan: 3}} id={"userInfoID" + user.userID} contentEditable={true}></TextField>

                          <label htmlFor={"addressID" + user.userID}>AddressID</label>
                          <TextField value={user.addressID.toString()} {...{ colspan: 3}} id={"addressID" + user.userID} contentEditable={true}></TextField>

                          <label htmlFor={"username" + user.userID}>Username</label>
                          <TextField value={user.username} {...{ colspan: 3}} id={"username" + user.userID} contentEditable={true}></TextField>

                          <label htmlFor={"role" + user.userID}>Role</label>
                          <TextField value={user.role} {...{ colspan: 3}} id={"role" + user.userID} contentEditable={true}></TextField>

                          <label htmlFor={"active" + user.userID}>Active</label>
                          <TextField value={user.active.toString()} id={"active" + user.userID} {...{ colspan: 3}} contentEditable={true}></TextField>

                          <div className="pt-3 pb-3">
                              <Button className="btn btn-primary" type="button" onClick={() => getAndSendFormData(user.userID)}>Submit</Button>
                          </div>

                      </FormLayout>
                  )}

            >

                <GridSortColumn  header="UserID" path="userID" autoWidth resizable/>
                <GridSortColumn  header="UserInfoID" path="userInfoID" autoWidth resizable/>
                <GridSortColumn  header="AddressID" path="addressID" autoWidth resizable/>
                <GridSortColumn  path="username" autoWidth resizable/>
                <GridSortColumn  path="role" autoWidth resizable/>
                <GridSortColumn  path="active" autoWidth resizable/>
                <GridSortColumn  header="User Since" path="createdAt" autoWidth resizable/>
            </Grid>
        </div>
    );
}