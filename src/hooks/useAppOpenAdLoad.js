import { useEffect, useState } from "react";
import { appOpenAd } from "../utils/admob";

const useAppOpenAdLoad = (options = { instant: true }) => {
    const [loaded, setLoaded] = useState(false);

    const loadAd = () => {
        try {
            appOpenAd.load();
            setLoaded(appOpenAd.loaded);
        } catch (err) {
            console.log(err);
            setLoaded(false);
        }
    };

    const displayAd = () => {
        appOpenAd.show();
    };

    useEffect(() => {
        loadAd();
    }, []);

    useEffect(() => {
        if (options?.instant && loaded) displayAd();
    }, [loaded]);

    return {
        appOpenAd,
        loaded,
    };
};

export default useAppOpenAdLoad;