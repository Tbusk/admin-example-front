import {useEffect, useState} from "react";
import GetAPI from "./GetAPI";

interface TotalProps {
    apiURL: string;
}

export default function DashboardTotal(props: TotalProps) {
    const [totalUsers, setUserTotal] = useState<number>(0);
    useEffect(() => {
        GetAPI({ apiURL: "http://localhost:8080/api/dashboard" + props.apiURL} ).then((data:number) => {
            setUserTotal(data);
        });
    }, []);

    return totalUsers;
}