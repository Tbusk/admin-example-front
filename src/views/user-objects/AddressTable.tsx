import React, {useEffect, useState} from "react";
import {Grid} from "@hilla/react-components/Grid";
import {GridSortColumn} from "@hilla/react-components/GridSortColumn";
import {Notification} from "@hilla/react-components/Notification";
import {FormLayout} from "@hilla/react-components/FormLayout";
import {TextField} from "@hilla/react-components/TextField";

export default function AddressTable() {

    /**
     * A function that creates a notification to the user that the address was successfully updated.
     */
    function updatingNotification() {
        const notification = Notification.show('Updating address. Refreshing content ...', {
            position: 'top-center',
            duration: 2000,
            theme: 'contrast',
        }) ;
        return <></>;
    }

    /**
     * A function that creates a notification to the user that the address was successfully deleted.
     */
    function deletingNotification() {
        const notification = Notification.show('Deleting address. Refreshing content ...', {
            position: 'top-center',
            duration: 2000,
            theme: 'contrast',
        }) ;
        return <></>;
    }

    /**
     * An interface used to map an object, just like DBO in Java, to collect data from an API and put it into a usable object.
     */
    interface Addresses {
        addressID: number,
        addressOne: string,
        addressTwo: string,
        city: string,
        state: string,
        country: string,
        zip: number
    }

    // Creates constant variables and setter methods (plus initial values) as an array of the Addresses object
    const [address, setAddresses] = useState<Addresses[]>([]);
    const [selectedItems, setSelectedItems] = useState<Addresses[]>([]);
    const [detailsOpenedItem, setDetailsOpenedItem] = useState<Addresses[]>([]);

    // Fetches address data from the API when page loads and puts it into the Address array
    useEffect(() => {
        async function fetchAdresses() {
            try {
                const response = await fetch('http://localhost:8080/api/address/list', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const data = await response.json();
                setAddresses(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchAdresses();
    }, []);


    /**
     * Collects form field data, converts it to JSON, sends the form data to the backend API, shows a success notification, and reloads the page.
     */
    async function getAndSendFormData(addressID:number) {
        const formData = new FormData();
        formData.append('addressID',(addressID.toString()));
        formData.append('addressOne',(document.getElementById('addressOne' + addressID) as HTMLInputElement).value);
        formData.append('addressTwo',(document.getElementById('addressTwo' + addressID) as HTMLInputElement).value);
        formData.append('city',(document.getElementById('city' + addressID) as HTMLInputElement).value);
        formData.append('state',(document.getElementById('state' + addressID) as HTMLInputElement).value);
        formData.append('country',(document.getElementById('country' + addressID) as HTMLInputElement).value);
        formData.append('zip',(document.getElementById('zip' + addressID) as HTMLInputElement).value);


        const jsonObject: { [key: string]: any } = {};
        for (const [key, value] of formData.entries()) {
            jsonObject[key] = value;
        }

        const jsonString = JSON.stringify(jsonObject);
        console.log((document.getElementById('userInfoID') as HTMLInputElement).value);
        console.log(jsonString);

        await fetch('http://localhost:8080/api/address', {
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

    /**
     * Collects form field data, converts it to JSON, sends the form data to the backend API, shows a success notification, and reloads the page.
     */
    async function deleteAddress(addressID:number) {
        const formData = new FormData();
        formData.append('addressID',(addressID.toString()));

        const jsonObject: { [key: string]: any } = {};
        for (const [key, value] of formData.entries()) {
            jsonObject[key] = value;
        }

        const jsonString = JSON.stringify(jsonObject);

        await fetch('http://localhost:8080/api/address', {
            method: 'DELETE',
            body: jsonString,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        }).then(response => response.json()).then(data => console.log(data)).catch(error => console.error(error));

        deletingNotification();
        setTimeout(() => {
            window.location.reload();
        }, 2000);
    }

    // Returns a table with a sub-table accessible by clicking on a row to edit values, resize columns, and sort by a column
    return (
        <div className="container-lg p-4 pt-0 pb-3">
            <h3 className="text-center pt-3 pb-3">Address Table</h3>
            <Grid items={address}  selectedItems={selectedItems}
                  onActiveItemChanged={(e) => {
                      const address = e.detail.value;
                      setDetailsOpenedItem(address ? [address] : []);
                  }} multiSort multiSortPriority="append"
                  columnRendering="lazy"
                  style={{height: '500px'}}
                  detailsOpenedItems={detailsOpenedItem}
                  rowDetailsRenderer={({ item: address}) => (
                      <FormLayout responsiveSteps={[{ minWidth: '0', columns: 3}]}>
                          <TextField label="addressID" value={address.addressID.toString()} {...{ colspan: 3}} id={"addressID"} hidden={true}></TextField>

                          <label htmlFor={"addressOne" + address.addressID} >Address One</label>
                          <TextField value={address.addressOne} {...{ colspan: 3}} id={"addressOne" + address.addressID} contentEditable={true}></TextField>

                          <label htmlFor={"addressTwo" + address.addressID} >Address Two</label>
                          <TextField value={address.addressTwo} {...{ colspan: 3}} id={"addressTwo" + address.addressID} contentEditable={true}></TextField>

                          <label htmlFor={"city" + address.addressID} >City</label>
                          <TextField value={address.city} {...{ colspan: 3}} id={"city" + address.addressID} contentEditable={true}></TextField>

                          <label htmlFor={"state" + address.addressID} >State</label>
                          <TextField value={address.state} {...{ colspan: 3}} id={"state" + address.addressID} contentEditable={true}></TextField>

                          <label htmlFor={"country" + address.addressID} >Country</label>
                          <TextField value={address.country} id={"country" + address.addressID} {...{ colspan: 3}} contentEditable={true}></TextField>

                          <label htmlFor={"zip" + address.addressID} >Zip</label>
                          <TextField value={address.zip.toString()} id={"zip" + address.addressID} {...{ colspan: 3}} contentEditable={true}></TextField>

                          <div className="container-fluid d-flex m-0 p-0">
                              <div className="btn-group align-items-center justify-content-center" role="group">
                                  <button type="button" className="btn btn-primary" onClick={() => getAndSendFormData(address.addressID)}>Submit</button>
                                  <button type="button" className="btn btn-primary" onClick={() => deleteAddress(address.addressID)}>Delete</button>
                              </div>
                          </div>


                      </FormLayout>
                  )}>
                <GridSortColumn header="AddressID" path="addressID"  autoWidth resizable/>
                <GridSortColumn header="Address One" path="addressOne" autoWidth resizable/>
                <GridSortColumn header="Address Two" path="addressTwo" autoWidth resizable/>
                <GridSortColumn path="city" autoWidth resizable/>
                <GridSortColumn path="state" autoWidth resizable/>
                <GridSortColumn path="country" autoWidth resizable/>
                <GridSortColumn path="zip" autoWidth resizable/>
            </Grid>
        </div>
    );
}