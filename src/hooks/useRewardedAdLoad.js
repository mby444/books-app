import { useEffect, useState } from "react";
import { RewardedAdEventType } from "react-native-google-mobile-ads";
import { rewardedAd } from "../utils/admob";

const useRewardedAdLoad = (options = { instant: true }) => {
    const [loaded, setLoaded] = useState(false);
    const [reward, setReward] = useState({});

    useEffect(() => {
        const unsubscribeLoaded = rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeEarned = rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD,  (reward) => {
            setReward(reward);
            console.log(reward);
        });
        rewardedAd.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);

    useEffect(() => {
        if (options?.instant && loaded) rewardedAd.show();
        console.log(loaded);
    }, [loaded]);

    return {
        rewardedAd,
        loaded,
        reward,
    };
};

export default useRewardedAdLoad;