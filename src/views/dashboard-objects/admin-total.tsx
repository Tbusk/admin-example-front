import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import {useEffect, useState} from "react";
import {grey} from "@mui/material/colors";
export default function AdminTotal() {



    const [totalUsers, setuserTotal] = useState<number>(0);
    useEffect(() => {
        fetchAdminTotal().then((data) => {
            setuserTotal(data);
        });
    }, []);

    async function fetchAdminTotal() {
            try {
                const response = await fetch('http://localhost:8080/api/dashboard/admins-count', {
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
        <Card sx={{width: 218}} className="text-center p-4" variant="soft" size="lg" color="primary" invertedColors>
            <div>
                <Typography level="h3">Admins</Typography>
            </div>
            <CardContent>
                <Typography level = "h4">
                    {totalUsers}
                </Typography>
            </CardContent>
        </Card>
        </div>
    );
}