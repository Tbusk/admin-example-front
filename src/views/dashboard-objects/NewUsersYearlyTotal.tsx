import {useEffect, useState} from "react";
import GetAPI from "./GetAPI";

export default function NewUsersYearlyTotal() {

    const [totalUsers, setUserTotal] = useState<number>(0);
    useEffect(() => {
        GetAPI({ apiURL: "http://localhost:8080/api/dashboard/new-users/yearly/count"} ).then((data:number) => {
            setUserTotal(data);
        });
    }, []);

    return totalUsers;
}