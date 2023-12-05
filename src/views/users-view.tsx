import React, { useEffect, useState } from 'react';
import { Grid } from '@hilla/react-components/Grid.js';
import { GridColumn } from '@hilla/react-components/GridColumn.js';
import AddUser from "./user-objects/add-user";
import '@vaadin/icons';
import UserTable from "./user-objects/user-table";
import UserInfo from "./user-objects/userinfo-table";
import AddressTable from "./user-objects/address-table";
import {TabSheet} from "@hilla/react-components/TabSheet";
import {Tabs} from "@hilla/react-components/Tabs";
import {Tab} from "@hilla/react-components/Tab";
import AddUserInfo from "./user-objects/add-userinfo";
import AddAddress from "./user-objects/add-address";

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