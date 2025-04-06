declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const initializeAds = () => {
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch (error) {
    console.error("Ad initialization error:", error);
  }
};
