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

            return parseInt(await response.text());
        } catch (error) {
            console.error(error);
            return 0;
        }
}