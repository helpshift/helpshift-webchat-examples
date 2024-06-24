<script setup>
import { onMounted, ref } from "vue";

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

let isLoggedIn = ref(false);
let selectedPrivacyOption = ref("disable");

const updateHelpshiftConfig = () => {
  Helpshift("updateHelpshiftConfig");
};

const onLogin = () => {
  isLoggedIn.value = true;
  helpshiftConfig.userId = "captain_planet12";
  helpshiftConfig.userEmail = "captain@example.com";
  Helpshift("updateHelpshiftConfig");
};

const onLogout = () => {
  isLoggedIn.value = false;
  helpshiftConfig.userId = "";
  helpshiftConfig.userEmail = "";
  Helpshift("updateHelpshiftConfig");
};

const onFullPrivacyChange = (event) => {
  const val = event.target.value;
  selectedPrivacyOption.value = val;
  if (val === "enable") {
    helpshiftConfig.fullPrivacy = true;
  } else {
    helpshiftConfig.fullPrivacy = false;
  }
  Helpshift("updateHelpshiftConfig");
};
</script>

<template>
  <main class="max-w-3xl mt-5">
    <h1 class="text-5xl pl-3">Web Chat</h1>
    <div
      class="bg-blue-100 border-l-4 border-blue-500 text-blue-800 p-2 my-4 rounded"
    >
      <p>
        This page is created purely for demo purposes and does not contain all
        the Web Chat APIs, options, or events. Please check the
        <a
          href="https://developers.helpshift.com/web-chat/"
          class="text-blue-500"
          target="_blank"
        >
          Developer documentation
        </a>
        for the complete details.
      </p>
    </div>

    <div class="w-full border-gray-300 mt-12 rounded-lg">
      <h3
        class="py-2 pl-3 text-lg rounded-t-lg font-bold uppercase text-gray-800"
      >
        Quick setup
      </h3>
      <div class="m-3">
        <div class="mt-2 flex justify-between">
          <h4 class="text-lg py-2">Update config</h4>
          <div>
            <button @click="updateHelpshiftConfig">
              Update Helpshift Config
            </button>
          </div>
        </div>
        <div className="mt-2 flex justify-between">
          <h4 className="text-lg py-2">Login user</h4>
          <div>
            <button v-if="isLoggedIn" @click="onLogout">Logout</button>
            <button v-else @click="onLogin">Login</button>
          </div>
        </div>
        <div class="mt-2 flex justify-between">
          <h2 class="text-lg py-2">Full privacy</h2>
          <div class="flex flex-col space-y-2 p-2">
            <form>
              <div class="inline-flex items-center mr-4">
                <input
                  type="radio"
                  value="enable"
                  @change="onFullPrivacyChange"
                  v-model="selectedPrivacyOption"
                  class="form-radio h-5 w-5 text-blue-600"
                />
                <span class="ml-2 text-gray-700">Enable Full Privacy</span>
              </div>
              <div class="inline-flex items-center">
                <input
                  type="radio"
                  value="disable"
                  @change="onFullPrivacyChange"
                  v-model="selectedPrivacyOption"
                  class="form-radio h-5 w-5 text-blue-600"
                />
                <span class="ml-2 text-gray-700">Disable Full Privacy</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
