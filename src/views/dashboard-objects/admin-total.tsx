import {useEffect, useState} from "react";
import GetAPI from "./getAPI";
export default function AdminTotal() {

    const [totalAdmins, setuserTotal] = useState<number>(0);
    useEffect(() => {
        GetAPI({ apiURL: "http://localhost:8080/api/dashboard/new-users/admins/count"} ).then((data:number) => {
            setuserTotal(data);
        });
    }, []);

    return totalAdmins;
}