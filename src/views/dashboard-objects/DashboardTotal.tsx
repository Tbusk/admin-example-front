import {useEffect, useState} from "react";
import GetAPI from "./GetAPI";

/**
 * Interface to map values as parameter to parent object (DashboardTotal)
 */
interface TotalProps {
    apiURL: string;
}

/**
 * Function that returns API from specified api url.  Used for retrieving totals (user total, admin total, etc.)
 * @param props - an interface which contains apiURL as a mapped item as a parameter for parent object (DashboardTotal)
 */
export default function DashboardTotal(props: TotalProps) {

    // Creates a constant variable and setter method for users with 0 as default
    const [total, setTotal] = useState<number>(0);
    useEffect(() => {
        GetAPI({ apiURL: "http://localhost:8080/api/dashboard" + props.apiURL} ).then((data:number) => {
            setTotal(data);
        });
    }, []);

    return total;
}