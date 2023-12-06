import {useEffect, useState} from "react";
import GetAPI from "./getAPI";

export default function NewUsersTriMonthlyTotal() {

    const [totalUsers, setUserTotal] = useState<number>(0);
    useEffect(() => {
        GetAPI({ apiURL: "http://localhost:8080/api/dashboard/new-users/trimonthly/count"} ).then((data:number) => {
            setUserTotal(data);
        });
    }, []);

    return totalUsers;
}