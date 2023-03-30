import data from "../../config/api-key.json";

const getApiKey = () => {
    try {
        const { apiKey } = data;
        return apiKey;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export {
    getApiKey
}