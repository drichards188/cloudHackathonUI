import React, { useEffect, useRef, useState } from "react";

let tvScriptLoadingPromise: any;

export default function TradingViewWidget(props: any) {
  const onLoadScriptRef = useRef();
  const [chartSymbol, setChartSymbol] = useState("NASDAQ:AAPL");

  useEffect(() => {
    if (props.symbol !== undefined && props.symbol !== chartSymbol) {
      let translatedSymbol = "";
      switch (props.symbol) {
        case "lulu":
          translatedSymbol = "NASDAQ:LULU";
          break;
        case "ibm":
          translatedSymbol = "NYSE:IBM";
          break;
        case "fl":
          translatedSymbol = "NYSE:FL";
          break;
        default:
          translatedSymbol = "NASDAQ:AAPL";
      }
      setChartSymbol(translatedSymbol);
    }
  }, [props.symbol]);

  // @ts-ignore
  useEffect(() => {
    // @ts-ignore
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => {
      // @ts-ignore
      onLoadScriptRef.current && onLoadScriptRef.current();
    });

    // @ts-ignore
    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (
        document.getElementById("tradingview_3fe4f") &&
        "TradingView" in window
      ) {
        // @ts-ignore
        new window.TradingView.widget({
          autosize: true,
          symbol: `${chartSymbol}`,
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: "tradingview_3fe4f",
        });
      }
    }
  }, [chartSymbol]);

  return (
    <div
      className="tradingview-widget-container"
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0,0,0,0)",
      }}
    >
      <div
        id="tradingview_3fe4f"
        style={{ height: "25vh", width: "100%" }}
      />

      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text">Track all markets on TradingView</span>
        </a>
      </div>
    </div>
  );
}

