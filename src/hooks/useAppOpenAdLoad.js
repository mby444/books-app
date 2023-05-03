import { useEffect, useState } from "react";
import { AdEventType } from "react-native-google-mobile-ads";
import { appOpenAd } from "../utils/admob";

const useAppOpenAdLoad = (options = { instant: true }) => {
    const [loaded, setLoaded] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    const showAd = async () => {
        try {
            appOpenAd.show();
        } catch (err) {
            console.log(err);
            setIsClosed(true);
        }
    };

    useEffect(() => {
        const unsubscribeLoaded = appOpenAd.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeClosed = appOpenAd.addAdEventListener(AdEventType.CLOSED, () => {
            setIsClosed(true);
        });

        appOpenAd.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeClosed();
        };
    }, []);

    useEffect(() => {
        if (options?.instant && loaded) showAd();
    }, [loaded]);

    return {
        appOpenAd,
        loaded,
        isClosed,
    };
};

export default useAppOpenAdLoad;