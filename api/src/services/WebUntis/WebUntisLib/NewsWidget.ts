import MessagesOfDay from "./MessagesOfDay";

export interface NewsWidget {
    systemMessage: any;
    messagesOfDay: MessagesOfDay[];
    rssUrl: string;
}
