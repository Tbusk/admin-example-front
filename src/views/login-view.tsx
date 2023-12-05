import React from 'react';
import { Notification } from '@hilla/react-components/Notification.js';

function loginNotification() {
    const notification = Notification.show('Successfully Logged In.  Your token will expire in 8hrs. Redirecting ...', {
        position: 'top-center',
        duration: 4000,
        theme: 'contrast',
    }) ;
    return <></>;
}

export default function Login() {

    const getJwtToken = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            username: formData.get('username'),
            password: formData.get('password')
        };

        const response = await fetch('http://localhost:8080/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const { accessToken } = await response.json();
        localStorage.setItem('jwtToken', accessToken);
        loginNotification();
        setTimeout(() => {
            window.location.href = "./users";
        }, 4000);
    };

    return (
        <div className="d-flex justify-content-center mt-5">
            <div className="card" style={{width:'28rem'}}>
                <div className="card-body m-4 ">
                    <h3 className="card-title text-center pt-5 pb-4">
                        Login
                    </h3>
                    <form onSubmit={getJwtToken} method="post">
                        <div className="form-outline mb-4 p-2" >
                            <input type="text" name="username" id="username" className="form-control" placeholder="Username"/>

                        </div>

                        <div className="form-outline mb-4 p-2">
                            <input type="password" id="password" name="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="row mb-4">
                            <div className="col d-flex justify-content-center">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                                    <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                                </div>
                            </div>

                            <div className="col">
                                <a href="#!">Forgot password?</a>
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}