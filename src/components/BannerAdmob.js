import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { adBannerId } from "../utils/admob";

export default function BannerAdmob() {
  return (
      <BannerAd
        unitId={adBannerId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
  );
}