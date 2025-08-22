/**
 * Returns a Date or timestamp offset from now by a given interval.
 * @param amount - number of units to add
 * @param unit - "minutes" | "hours" | "days"
 * @param asMs - if true, returns timestamp in ms; otherwise returns Date object
 */

export interface AddTimeProps {
    amount: number;
    unit: "minutes" | "hours" | "days";
    asMs?: boolean;
}

export function addTime({
    amount,
    unit,
    asMs = false,
}: AddTimeProps): Date | number {
    const now = new Date();

    switch (unit) {
        case "minutes":
            now.setMinutes(now.getMinutes() + amount);
            break;
        case "hours":
            now.setHours(now.getHours() + amount);
            break;
        case "days":
            now.setDate(now.getDate() + amount);
            break;
        default:
            throw new Error(
                "Unsupported unit. Use 'minutes', 'hours', or 'days'."
            );
    }

    return asMs ? now.getTime() : now;
}
