import {useEffect, useState} from "react";
import GetAPI from "./GetAPI";

export default function UsersTotal() {

    const [totalUsers, setUserTotal] = useState<number>(0);
    useEffect(() => {
        GetAPI({ apiURL: "http://localhost:8080/api/dashboard/new-users/users/count"} ).then((data:number) => {
            setUserTotal(data);
        });
    }, []);

    return totalUsers;
}