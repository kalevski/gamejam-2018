import axios from 'axios';

export default (method, url, data) => {
    return axios({
        method: method,
        url: 'http://' + process.env.REACT_APP_API + url,
        data: data,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    }).then((response) => {
        return {
            status: response.status,
            data: response.data
        }
    });
};