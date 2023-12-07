import React from "react";
import DashboardCard from "./dashboard-objects/DashboardCard";
import DashboardTotal from "./dashboard-objects/DashboardTotal";

export default function Dashboard() {

    return (
        <div className="container-lg">
            <div className="m-5">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3 justify-content-center align-items-center"><DashboardCard title='Total Users' count={DashboardTotal({apiURL:'/new-users/users/count'})}/></div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3"><DashboardCard title='Total Admins' count={DashboardTotal({apiURL:'/new-users/admins/count'})}/></div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3"><DashboardCard title='New Users (30 Days)' count={DashboardTotal({apiURL:'/new-users/pastmonth/count'})}/></div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3"><DashboardCard title='New Users (90 Days)' count={DashboardTotal({apiURL:'/new-users/trimonthly/count'})}/></div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3"><DashboardCard title='New Users (Year)' count={DashboardTotal({apiURL:'/new-users/yearly/count'})}/></div>
                </div>
            </div>
        </div>

    );
}