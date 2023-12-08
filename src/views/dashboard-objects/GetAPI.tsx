interface GetAPIProps {
    apiURL: string;
}

export default async function GetAPI(props: GetAPIProps) {

    const { apiURL } = props;
    const request = new Request(apiURL);

    try {
        const response = await fetch(request, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
            }
        });
        if( response.status === 200) {
            return parseInt(await response.text());
        } else {
            console.log("Issue with getting API data.")
            return 0;
        }
    } catch (error) {
        console.error(error);
        return 0;
    }
}

export async function GetMultiPartAPI(props: GetAPIProps) {

    const { apiURL } = props;
    const request = new Request(apiURL);

    const response = await fetch(request, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
        }
    });

    return response;
}