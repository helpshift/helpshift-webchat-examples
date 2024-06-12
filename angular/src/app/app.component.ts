import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.development';

declare const Helpshift: any;
declare const helpshiftConfig: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Web Chat';

  constructor(private renderer: Renderer2) {}

  isLoggedIn: boolean = false;
  selectedPrivacyOption: string = 'disable';
  selectedLauncherOption: string = 'showLauncher';
  position: string = 'bottom-right';
  selectedFullScreenOption: string = 'exitFullScreen';

  ngOnInit() {
    this.loadScript();
  }

  private loadScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = `
    (function () {
      var PLATFORM_ID = "${environment.PLATFORM_ID}",
        DOMAIN = "${environment.DOMAIN}",
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
    this.renderer.appendChild(document.body, script);
  }

  updateHelpshiftConfig() {
    Helpshift('updateHelpshiftConfig');
  }

  onLogin() {
    helpshiftConfig.userId = 'captain_planet12';
    helpshiftConfig.userEmail = 'captain@example.com';

    Helpshift('updateHelpshiftConfig');
    this.isLoggedIn = true;
  }

  onLogout() {
    helpshiftConfig.userId = '';
    helpshiftConfig.userEmail = '';

    Helpshift('updateHelpshiftConfig');
    this.isLoggedIn = false;
  }

  onFullPrivacyChange(event: any) {
    let val = event.target.value;
    if (val === 'enable') {
      this.selectedPrivacyOption = 'enable';
      helpshiftConfig.fullPrivacy = true;
    } else {
      this.selectedPrivacyOption = 'disable';
      helpshiftConfig.fullPrivacy = false;
    }
    Helpshift('updateHelpshiftConfig');
  }

  onLauncherChange(event: any) {
    const val = event.target.value;
    if (val === 'showLauncher') {
      this.selectedLauncherOption = 'showLauncher';
      Helpshift('show');
    } else {
      this.selectedLauncherOption = 'hideLauncher';
      Helpshift('hide');
    }
  }

  onChangeWidgetPosition(event: any) {
    const val = event.target.value;
    this.position = val;
  }

  onWidgetPositionApply() {
    helpshiftConfig.widgetOptions.position = this.position;
    Helpshift('updateHelpshiftConfig');
  }

  onFullScreenChange(event: any) {
    const val = event.target.value;
    this.selectedFullScreenOption = val;
    if (val === 'enterFullScreen') {
      helpshiftConfig.widgetOptions.fullScreen = true;
    } else {
      helpshiftConfig.widgetOptions.fullScreen = false;
    }
    Helpshift('updateHelpshiftConfig');
  }
}
