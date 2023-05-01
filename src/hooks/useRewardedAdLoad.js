import { useEffect, useState } from "react";
import { RewardedAd, RewardedAdEventType } from "react-native-google-mobile-ads";
import { interstitialUnitId } from "../../config/admob.json";
import { adIntersitialId, rewardedAd } from "../utils/admob";

const useRewardedAdLoad = () => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeEarned = rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD,  (reward) => {
            console.log(reward);
        });
        rewardedAd.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);

    return {
        rewardedAd,
        loaded,
    };
};

export default useRewardedAdLoad;