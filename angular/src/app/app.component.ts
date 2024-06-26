import { Component, Renderer2, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment.development';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

declare const Helpshift: any;
declare const helpshiftConfig: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Web Chat';

  constructor(private renderer: Renderer2, private ngZone: NgZone) {}

  isLoggedIn: boolean = false;

  position: string = 'bottom-right';

  unreadMessageCount: any = 0;

  messageEventListenerIsAdded: boolean = false;

  message: string = '';

  messageAddEventHandlerReference: any;

  newUnreadMessagesEventHandler: any;

  // @NOTE: In order to add an event to the window, you should add it
  // when the component mounts using ngOnInit()
  // and remove it when the component unmounts using ngOnDestroy();

  ngOnInit() {
    this.loadScript();

    // @NOTE: In order to add New Unread Messages event handler, add the following code.
    this.newUnreadMessagesEventHandler = (data: any) => {
      this.ngZone.run(() => {
        this.unreadMessageCount = data.unreadCount;
      });
    };
    Helpshift(
      'addEventListener',
      'newUnreadMessages',
      this.newUnreadMessagesEventHandler
    );
  }

  // @NOTE: In order to remove New Unread Messages event handler, add the following code.
  ngOnDestroy() {
    Helpshift(
      'removeEventListener',
      'newUnreadMessages',
      this.newUnreadMessagesEventHandler
    );
  }

  private loadScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = `
    (function () {

      //  @NOTE: In order to load Web Chat, you have to set the PLATFORM_ID and DOMAIN in the script.
      // https://developers.helpshift.com/web-chat/getting-started/#manual-embed

      var PLATFORM_ID = "${environment.PLATFORM_ID}",
        DOMAIN = "${environment.DOMAIN}",
        LANGUAGE = "en";

        // Do not modify the code below

        // @NOTE: It's a good idea to set all widget options and information here.
        // However, in the case where some information needs to be added later (async),
        // use the updateHelpshiftConfig API https://developers.helpshift.com/web-chat/api/

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

    // Do not modify the code above

    `;
    this.renderer.appendChild(document.body, script);
  }

  updateHelpshiftConfig() {
    // @NOTE: If you want to update the helpshiftConfig object after your web page
    //  has loaded, you can do it by calling the following API.
    Helpshift('updateHelpshiftConfig');
  }

  onLogin() {
    // @NOTE: You can update the data in config object using the below code.
    helpshiftConfig.userId = 'captain_planet12';
    helpshiftConfig.userEmail = 'captain@example.com';

    Helpshift('updateHelpshiftConfig');
    this.isLoggedIn = true;
    this.message = '';
  }

  onLogout() {
    helpshiftConfig.userId = '';
    helpshiftConfig.userEmail = '';

    Helpshift('updateHelpshiftConfig');
    this.isLoggedIn = false;
    this.message = '';
  }

  privacyForm = new FormGroup({
    selectedPrivacyOption: new FormControl('disable'),
  });

  onFullPrivacyChange(event: any) {
    let val = event.target.value;
    if (val === 'enable') {
      helpshiftConfig.fullPrivacy = true;
    } else {
      helpshiftConfig.fullPrivacy = false;
    }
    Helpshift('updateHelpshiftConfig');
  }

  launcherForm = new FormGroup({
    selectedLauncherOption: new FormControl('showLauncher'),
  });
  onLauncherChange(event: any) {
    const val = event.target.value;
    if (val === 'showLauncher') {
      // @NOTE: You can show Web Chat completely by calling the following API.
      Helpshift('show');
    } else {
      // @NOTE: You can hide Web Chat completely by calling the following API.
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

  fullScreenForm = new FormGroup({
    selectedFullScreenOption: new FormControl('exitFullScreen'),
  });

  onFullScreenChange(event: any) {
    const val = event.target.value;
    if (val === 'enterFullScreen') {
      helpshiftConfig.widgetOptions.fullScreen = true;
    } else {
      helpshiftConfig.widgetOptions.fullScreen = false;
    }
    Helpshift('updateHelpshiftConfig');
  }

  // @NOTE: We do not recommend adding events dynamically (on button clicks)
  // because they will be reattached every time the component re-renders and can potentially lead to memory leaks.
  // Instead, we prefer to add them
  // when the component mounts, and remove them when the component unmounts

  // However, if you still want to start listening to events on some action, then this is the right way
  // You can do so by creating a reference of messageAddEventHandler function while adding the event
  // and binding it to current context (this) and store it in some reference variable(messageAddEventHandlerReference)
  // and when you want to call the handler you can call this reference variable (messageAddEventHandlerReference).

  // @NOTE: To add Message Add event handler, add the following code.
  // This event is triggered when the user adds a message to a conversation.

  onAddMessageEventClick() {
    this.messageEventListenerIsAdded = true;
    this.messageAddEventHandlerReference =
      this.messageAddEventHandler.bind(this);
    Helpshift(
      'addEventListener',
      'messageAdd',
      this.messageAddEventHandlerReference
    );
  }

  // @NOTE: In order to remove Message Add event handler, add the following code.
  onRemoveMessageEventClick() {
    this.messageEventListenerIsAdded = false;
    Helpshift(
      'removeEventListener',
      'messageAdd',
      this.messageAddEventHandlerReference
    );
  }

  messageAddEventHandler(data: any) {
    this.ngZone.run(() => {
      this.message = data.body;
    });
  }
}
