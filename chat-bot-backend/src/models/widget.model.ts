import { Document, Schema, model } from "mongoose";

//import { widgetDocument } from "./widget.model";

//declare module namespace {
export interface MinimizedWidget {
  bgColor: string;
  iconColor: string;
}

export interface WelcomeScreen {
  headerBackground: string;
  hearderText: string;
  bgColor: string;
  title: string;
  titleColor: string;
  startButtonColor: string;
  startButtonText: string;
}

export interface ChatScreen {
  headerBackground: string;
  hearderText: string;
  bgColor: string;
  title: string;
  titleColor: string;
  startButtonColor: string;
  startButtonText: string;
  welcomeMsg: string;
  welcomeMsgBgColor: string;
  welcomeMsgTextColor: string;
  userResponseBgColor: string;
  userResponseText: string;
  userResponseTextColor: string;
}

export interface Theme {
  minimizedWidget: MinimizedWidget;
  welcomeScreen: WelcomeScreen;
  chatScreen: ChatScreen;
}

export interface widgetDocument extends Widget {
  id: string;
  title: string;
  description: string;
  powered_by: string;
  language: string;
  theme: Theme;
}

export interface Widget {
  uuid?: string;
  title: string;
  description: string;
  powered_by: string;
  language: string;
  theme: Theme;
}

export interface RootObject {
  widget: Widget;
}

const widgetSchema = new Schema<Widget>({
  uuid: {
    type: "String",
  },
  title: {
    type: "String",
  },
  // themeId: {
  //   type: "String",
  // },
  description: {
    type: "String",
  },
  powered_by: {
    type: "String",
  },
  language: {
    type: "String",
  },
  theme: {
    minimizedWidget: {
      bgColor: {
        type: "String",
      },
      iconColor: {
        type: "String",
      },
    },
    welcomeScreen: {
      headerBackground: {
        type: "String",
      },
      hearderText: {
        type: "String",
      },
      bgColor: {
        type: "String",
      },
      title: {
        type: "String",
      },
      titleColor: {
        type: "String",
      },
      startButtonColor: {
        type: "String",
      },
      startButtonText: {
        type: "String",
      },
    },
    chatScreen: {
      headerBackground: {
        type: "String",
      },
      hearderText: {
        type: "String",
      },
      bgColor: {
        type: "String",
      },
      title: {
        type: "String",
      },
      titleColor: {
        type: "String",
      },
      startButtonColor: {
        type: "String",
      },
      startButtonText: {
        type: "String",
      },
      welcomeMsg: {
        type: "String",
      },
      welcomeMsgBgColor: {
        type: "String",
      },
      welcomeMsgTextColor: {
        type: "String",
      },
      userResponseBgColor: {
        type: "String",
      },
      userResponseText: {
        type: "String",
      },
      userResponseTextColor: {
        type: "Date",
      },
    },
  },
});

export const widgetModel = model<Widget>("widgets", widgetSchema);
