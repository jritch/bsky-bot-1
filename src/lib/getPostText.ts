import moment from "moment";
import "moment-timezone";

export default async function getPostText() {
  // Generate the text for your post here. You can return a string or a promise that resolves to a string

  // Get all available time zone names
  const timezones = moment.tz.names();

  // Target time (5:00 PM)
  const targetHour = 17; // 24-hour format

  // Function to calculate minutes until 5:00 PM
  const minutesUntilTarget = (currentTime: any, targetTime: any) => {
    const duration = moment.duration(targetTime.diff(currentTime));
    return Math.floor(duration.asMinutes());
  };

  // Function to format timezone names
  const formatTimezoneName = (name: any) => {
    // Get the part after the last "/"
    const formattedName = name
      .split("/")
      .pop()
      .replace(/_/g, "") // Remove underscores
      .replace(/([a-z])([A-Z])/g, "$1 $2"); // Add space before capital letters

    return formattedName;
  };

  // Array to store the results
  const results = [] as any[];

  // Iterate over each time zone
  timezones.forEach((tz: any) => {
    // Filter out time zones that don’t contain "/" or contain "GMT"
    if (!tz.includes("/") || tz.includes("GMT")) return;

    // Get current time in the time zone
    const now = moment.tz(tz);

    // Set target time (5:00 PM) on the same day
    const targetTime = moment.tz(tz).set({
      hour: targetHour,
      minute: 0,
      second: 0,
      millisecond: 0,
    });

    // Calculate minutes until target time
    const minutesUntil = minutesUntilTarget(now, targetTime);

    // Add result to the array if it's within ±20 minutes of 5:00 PM
    if (Math.abs(minutesUntil) < 20) {
      // Format the timezone name and add it to results
      results.push([formatTimezoneName(tz), minutesUntil]);
    }
  });

  // Sort the filtered results by minutesUntil in ascending order
  results.sort((a: any, b: any) => a[1] - b[1]);

  // Display the sorted and formatted results
  console.log(results);

  function getRandomInt(min: any, max: any) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (results.length == 0) {
    return "";
  } else {
    const randomIndex = getRandomInt(0, results.length - 1);
    return "It's five o'clock in " + results[randomIndex][0] + "! https://www.youtube.com/watch?v=BPCjC543llU";
  }
}
