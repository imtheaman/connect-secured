export function calculateTimeAgo(arg: number) {
    const date = new Date();
    const _ = new Date(arg)
    const daysDiff = date.getUTCDate() - _.getUTCDate();
    if (daysDiff >= 14) return 'weeks ago';
    else if (daysDiff >= 7) return '1 week ago';
    else if (daysDiff >= 1) return `${daysDiff} days ago`;
    else if (daysDiff === 1) return 'yesterday';

    const hoursDiff = date.getUTCHours() - _.getUTCHours();
    if (hoursDiff >= 1)
      return `${hoursDiff} ${hoursDiff === 1 ? 'hr' : 'hrs'} ago`;

    const minutesDiff = date.getUTCMinutes() - _.getUTCMinutes();
    if (minutesDiff >= 1) return `${minutesDiff} ${minutesDiff === 1 ? 'min': 'mins'} ago`;
    else return 'now';
  }

// export function clockTime(arg: )