<template>Web Chat</template>

<script setup>

import { onMounted } from "vue";

onMounted(() => {
  const script = document.createElement("script");
  script.text = `
    (function () {

      var PLATFORM_ID = "${import.meta.env.VITE_APP_PLATFORM_ID}",
        DOMAIN = "${import.meta.env.VITE_APP_DOMAIN}",
        LANGUAGE = "en";


      window.helpshiftConfig = {
        platformId: PLATFORM_ID,
        domain: DOMAIN,
        language: LANGUAGE,
        widgetOptions:{},
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

  `;
  document.body.appendChild(script);
});
</script>
