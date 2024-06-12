import { Component, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.development';

declare const Helpshift: any;

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
}
