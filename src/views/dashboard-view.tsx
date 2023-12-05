import UsersTotal from "./dashboard-objects/users-total";
import AdminTotal from "./dashboard-objects/admin-total";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import NewUsersMonthlyTotal from "./dashboard-objects/new-users-monthly-total";
import NewUsersTriMonthlyTotal from "./dashboard-objects/new-users-trimonthly-total";
import NewUsersYearlyTotal from "./dashboard-objects/new-users-yearly-total";

export default function Dashboard() {
    return (
        <div className="container-fluids">

            <HorizontalLayout className="m-3">
                <NewUsersMonthlyTotal/><NewUsersTriMonthlyTotal/>
            </HorizontalLayout>
            <HorizontalLayout className="m-3">
                <NewUsersYearlyTotal/><HorizontalLayout className="">
                <UsersTotal/>
                <AdminTotal/>
            </HorizontalLayout>
            </HorizontalLayout>

        </div>

    );
}