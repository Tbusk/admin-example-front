import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import {useEffect, useState} from "react";
export default function UsersTotal() {



    const [totalUsers, setuserTotal] = useState<number>(0);
    useEffect(() => {
        fetchUserTotal().then((data) => {
            setuserTotal(data);
        });
    }, []);

    async function fetchUserTotal() {
            try {
                const response = await fetch('http://localhost:8080/api/dashboard/users-count', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                    }
                });
                const data = parseInt(await response.text());
                return data;
            } catch (error) {
                console.error(error);
                return 0;
            }
        }


    return (
        <div className="p-2">
        <Card sx={{width: 217}} className="text-center p-4" variant="soft" size="lg" color="primary" invertedColors>
            <div>
                <Typography level="h3">Users</Typography>
            </div>
            <CardContent>
                <Typography level="h4">
                    {totalUsers}
                </Typography>
            </CardContent>
        </Card>
        </div>
    );
}