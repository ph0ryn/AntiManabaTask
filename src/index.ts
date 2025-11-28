interface TaskInfo {
  courseName: string | null;
  taskName: string | null;
  taskStartDateTime: string | null;
  taskEndDateTime: string | null;
  url: string | null;
}

function parseGmailBodyText(text: string): TaskInfo {
  return {
    courseName: text.match(/\[コース名\] : (.*)/)?.[1]?.trim() ?? null,
    taskName: text.match(/\[課題名\] : (.*)/)?.[1]?.trim() ?? null,
    taskStartDateTime: text.match(/\[受付開始日時\] : (.*)/)?.[1]?.trim() ?? null,
    taskEndDateTime: text.match(/\[受付終了日時\] : (.*)/)?.[1]?.trim() ?? null,
    url: text.match(/PC : (https?:\/\/[\w/:%#$&?()~.=+-]+)/)?.[1]?.trim() ?? null,
  };
}

function getStartDateTime(taskInfo: TaskInfo, receivedDate: Date): Date {
  if (taskInfo.taskStartDateTime) {
    return new Date(taskInfo.taskStartDateTime);
  }

  const date = new Date(receivedDate.getTime());

  date.setHours(0, 0, 0, 0);

  return date;
}

function getEndDateTime(taskInfo: TaskInfo, startDateTime: Date): Date {
  if (taskInfo.taskEndDateTime) {
    return new Date(taskInfo.taskEndDateTime);
  }

  const date = new Date(startDateTime);

  date.setDate(date.getDate() + 1);
  date.setHours(0, 0, 0, 0);

  return date;
}

function addCalendar(
  courseName: string,
  taskName: string,
  startDateTime: Date,
  endDateTime: Date,
  url: string | null
): void {
  if (!courseName || !taskName || !startDateTime || !endDateTime) {
    Logger.log("カレンダーへの追加に必要な情報が不足しています。");

    return;
  }

  const calendar = CalendarApp.getDefaultCalendar();
  const title = `【課題】${courseName} - ${taskName}`;
  const description = url ? `課題URL: ${url}` : "";

  try {
    calendar.createEvent(title, startDateTime, endDateTime, { description: description });
  } catch (e) {
    Logger.log(`カレンダーへの追加に失敗しました: ${String(e)}`);
  }
}
 
function main(): void {
  Logger.log("Starting script...");

  const query = [
    "小テスト OR レポート",
    "公開のお知らせ",
    "from:do-not-reply@manaba.jp"
  ];

  const labelName = "新着課題";
    
  const halfYearAgo = new Date();

  halfYearAgo.setMonth(halfYearAgo.getMonth() - 6);
  halfYearAgo.setHours(0, 0, 0, 0); // 半年前の午前0時
  
  const searchQuery = `${query.join(" ")} -label:${labelName} after:${halfYearAgo.toISOString().slice(0, 10)}`;

  Logger.log(searchQuery);

  const threads = GmailApp.search(searchQuery);
  const newTasksLabel = GmailApp.getUserLabelByName(labelName) || GmailApp.createLabel(labelName);

  Logger.log(`Found ${threads.length} threads.`);
  Logger.log(`Label: ${newTasksLabel.getName()}`);

  let processedCount = 0;
  
  for (const thread of threads) {
    const messages = thread.getMessages();

    for (const message of messages) {
      const receivedDate = message.getDate();

      // 受信日が半年前より新しいかチェック
      if (receivedDate >= halfYearAgo) {
        const body = message.getPlainBody();
        const taskInfo = parseGmailBodyText(body);
  
        const startDateTime = getStartDateTime(taskInfo, receivedDate);
        const endDateTime = getEndDateTime(taskInfo, startDateTime);
  
        if (taskInfo.courseName && taskInfo.taskName && startDateTime && endDateTime) {
          addCalendar(
            taskInfo.courseName,
            taskInfo.taskName,
            startDateTime,
            endDateTime,
            taskInfo.url
          );

          thread.addLabel(newTasksLabel);
          processedCount++;
        } else {
          Logger.log("カレンダーに追加するための必須情報が不足しています。");
          Logger.log(taskInfo);
          Logger.log("受信日:", receivedDate);
        }
      }
    }
  }

  Logger.log(`${processedCount} 件の課題をカレンダーに追加しました。`);
}

// Make main available globally for Google Apps Script
globalThis.main = main;