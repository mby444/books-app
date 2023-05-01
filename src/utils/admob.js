import { RewardedAd, TestIds } from "react-native-google-mobile-ads";
import { bannerUnitId, interstitialUnitId } from "../../config/admob.json";

export const adBannerId = __DEV__ ? TestIds.BANNER : bannerUnitId;
export const adIntersitialId = __DEV__ ? TestIds.INTERSTITIAL : interstitialUnitId;
export const rewardedAd = RewardedAd.createForAdRequest(interstitialUnitId, {
    requestNonPersonalizedAdsOnly: true,
});