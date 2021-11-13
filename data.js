const baseURL = "https://api.foursquare.com/v2/";
const clientID = "RG1YLZYPE3WKDMPDD1XW34GQ2C4JGITBH3AH2WWD5KL5ZAEZ";
const clientSecret = "RWNKFGT3VXLSBBP0MUL55FV3FXTS4IFXBV20QBOGMV4XFNEY";
const version = "v2";

async function search(lat, lng, query) {
    // setup search parameters
    let ll = lat + "," + lng;
    let response = await axios.get(baseURL+'venues/search', {
        params: {
            'll': ll,
            'client_id': clientID,
            'client_secret': clientSecret,
            'v': '20211113',
            'query': query
        }
    })
    return response.data;
}