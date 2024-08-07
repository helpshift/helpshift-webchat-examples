import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script id="show-banner">
          {`
            (function () {

              //  @NOTE: In order to load Web Chat, you have to set the PLATFORM_ID and DOMAIN in the script.
              // https://developers.helpshift.com/web-chat/getting-started/#manual-embed

              var PLATFORM_ID = "${process.env.NEXT_PUBLIC_PLATFORM_ID}",
                DOMAIN = "${process.env.NEXT_PUBLIC_DOMAIN}",
                LANGUAGE = "en";

              // Do not modify the code below

              // @NOTE: It's a good idea to set all widget options and information here.
              // However, in the case where some information needs to be added later (async),
              // use the updateHelpshiftConfig API https://developers.helpshift.com/web-chat/api/

              window.helpshiftConfig = {
                platformId: PLATFORM_ID,
                domain: DOMAIN,
                language: LANGUAGE,
                widgetOptions: {},
              };
            })();

            !(function (t, e) {
              if ("function" != typeof window.Helpshift) {
                var n = function () {
                  n.q.push(arguments);
                };
                (n.q = []), (window.Helpshift = n);
                var i,
                  a = t.getElementsByTagName("script")[0];
                if (t.getElementById(e)) return;
                (i = t.createElement("script")),
                  (i.async = !0),
                  (i.id = e),
                  (i.src = "https://webchat.helpshift.com/latest/webChat.js");
                var o = function () {
                  window.Helpshift("init");
                };
                window.attachEvent
                  ? i.attachEvent("onload", o)
                  : i.addEventListener("load", o, !1),
                  a.parentNode.insertBefore(i, a);
              } else window.Helpshift("update");
            })(document, "hs-chat");
          `}
          {/* Do not modify the code above */}
        </Script>
        {children}
      </body>
    </html>
  );
}
