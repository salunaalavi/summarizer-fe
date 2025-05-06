import { format } from "date-fns";

interface Message {
  sender: string;
  message: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

export const parseChatText = (text: string, currentUserNames: string[] = ['Azqiadistya', 'You']): Message[] => {
  const messageRegex = /\[(\d{1,2}[:.]\d{2}), (\d{1,2}\/\d{1,2}\/\d{2,4})\] ([^:]+): ([^\n]+)/g;
  const messages: Message[] = [];
  let match;

  while ((match = messageRegex.exec(text)) !== null) {
    const [_, time, date, sender, message] = match;

    // Parse time
    const timeParts = time.includes('.') ? time.split('.') : time.split(':');
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);

    // Parse date
    const [day, month, year] = date.split('/').map(Number);
    const fullYear = year < 100 ? 2000 + year : year;

    messages.push({
      sender: sender.trim(),
      message: message.trim(),
      timestamp: new Date(fullYear, month - 1, day, hours, minutes),
      isCurrentUser: currentUserNames.some(name => name.toLowerCase() === sender.trim().toLowerCase()),
    });
  }

  return messages;
};

export const convertMessagesToText = (messages: Message[]): string => {
  return messages.map(msg => 
    `${msg.sender} [${format(msg.timestamp, 'HH:mm, dd/MM/yyyy')}]: ${msg.message}`
  ).join('\n');
};