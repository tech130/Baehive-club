import { useEffect } from "react";

export default function ShopifyBuyButton() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div id="product-component-123456789"></div>
  );
}



