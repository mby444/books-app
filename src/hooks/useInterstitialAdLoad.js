import { useEffect, useState } from "react";
import { AdEventType } from "react-native-google-mobile-ads";
import { interstitialAd } from "../utils/admob";

const useInterstitialAdLoad = (options = { instant: true }) => {
    const [loaded, setLoaded] = useState(false);
    const [isClosed, setIsClosed] = useState(false);

    const showAd = async () => {
        try {
            await interstitialAd.show();
        } catch (err) {
            console.log(err);
            setIsClosed(true);
        }
    };

    const reloadAd = () => {
        setLoaded(false);
        setIsClosed(false);
        interstitialAd.load();
    };

    useEffect(() => {
        const unsubscribeLoaded = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeClosed = interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
            setIsClosed(true);
        });

        interstitialAd.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeClosed();
        };
    }, []);

    useEffect(() => {
        if (options?.instant && loaded) showAd();
        console.log(loaded);
    }, [loaded]);

    return {
        interstitialAd,
        loaded,
        isClosed,
        reloadAd,
    };
};

export default useInterstitialAdLoad;