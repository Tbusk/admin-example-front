import UsersTotal from "./dashboard-objects/users-total";
import AdminTotal from "./dashboard-objects/admin-total";
import NewUsersMonthlyTotal from "./dashboard-objects/new-users-monthly-total";
import NewUsersTriMonthlyTotal from "./dashboard-objects/new-users-trimonthly-total";
import NewUsersYearlyTotal from "./dashboard-objects/new-users-yearly-total";
import React from "react";
import DashboardCard from "./dashboard-objects/dashboard-card";

export default function Dashboard() {
    return (
        <div className="container-lg">

            <div className="m-5">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3"><DashboardCard title='Total Users' count={UsersTotal()}/></div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3"><DashboardCard title='Total Users' count={AdminTotal()}/></div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3"><DashboardCard title='New Users (Past 30 Days)' count={NewUsersMonthlyTotal()}/></div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3"><DashboardCard title='New Users (Past 90 Days)' count={NewUsersTriMonthlyTotal()}/></div>
                    <div className="col-lg-4 col-md-6 col-sm-12 mb-3"><DashboardCard title='New Users (Past Year)' count={NewUsersYearlyTotal()}/></div>

                </div>
            </div>

        </div>

    );
}