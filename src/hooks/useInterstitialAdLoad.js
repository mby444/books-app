import { useEffect, useState } from "react";
import { AdEventType } from "react-native-google-mobile-ads";
import { interstitialAd } from "../utils/admob";

const useInterstitialAdLoad = (options = { instant: true }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
            console.log("loaded");
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (options?.instant && loaded) interstitialAd.show();
        console.log(loaded);
    }, [loaded]);

    return {
        interstitialAd,
        loaded,
    };
};

export default useInterstitialAdLoad;