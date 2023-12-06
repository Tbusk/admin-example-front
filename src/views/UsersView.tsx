import React from 'react';
import AddUser from "./user-objects/AddUser";
import UserTable from "./user-objects/UserTable";
import UserInfo from "./user-objects/UserInfoTable";
import AddressTable from "./user-objects/AddressTable";
import {TabSheet} from "@hilla/react-components/TabSheet";
import {Tabs} from "@hilla/react-components/Tabs";
import {Tab} from "@hilla/react-components/Tab";
import AddUserInfo from "./user-objects/AddUserInfo";
import AddAddress from "./user-objects/AddAddress";

export default function UsersView() {

    return (
        <TabSheet>
            <Tabs slot="tabs" theme="centered">
                <Tab id="users-table">Users
                </Tab>
                <Tab id="users-info-table">Users Info</Tab>
                <Tab id="address-table">Addresses</Tab>
            </Tabs>

            <div {...{ tab: 'users-table'}}>
                <UserTable/>
                <AddUser/>
            </div>
            <div {...{ tab: 'users-info-table'}}>
                <UserInfo/>
                <AddUserInfo/>
            </div>
            <div {...{ tab: 'address-table'}}>
                <AddressTable/>
                <AddAddress/>
            </div>

        </TabSheet>

    );
}