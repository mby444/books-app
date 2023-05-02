import { AppOpenAd, InterstitialAd, RewardedAd, TestIds } from "react-native-google-mobile-ads";
import { appOpenUnitId, bannerUnitId, interstitialUnitId, rewardedUnitId } from "../../config/admob.json";

export const adAppOpenId = __DEV__ ? TestIds.APP_OPEN : appOpenUnitId;
export const adBannerId = __DEV__ ? TestIds.BANNER : bannerUnitId;
export const adIntersitialId = __DEV__ ? TestIds.INTERSTITIAL : interstitialUnitId;
export const adRewardedId = __DEV__ ? TestIds.REWARDED : rewardedUnitId;

export const appOpenAd = AppOpenAd.createForAdRequest(adAppOpenId, {
    requestNonPersonalizedAdsOnly: true,
});
export const interstitialAd = InterstitialAd.createForAdRequest(adIntersitialId, {
    requestNonPersonalizedAdsOnly: true,
});
export const rewardedAd = RewardedAd.createForAdRequest(adRewardedId, {
    requestNonPersonalizedAdsOnly: true,
});