export function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalizeEachWord(str: string) {
    if (!str) return ""; // Fix when user hasn't logged in (the name is null)
    return str
        .toLowerCase()
        .split(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

export function fromEmailToName(email: string) {
    return capitalizeEachWord(email.split("@")[0].replace(/\./g, " "));
}

export function getDayAndHourFromRound(round: number) {
    const day = Math.floor(round / 2);
    const hour = round % 2;
    return { day, hour };
}
