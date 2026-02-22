/**
 * Sistema de check-in baseado em localStorage.
 * O progresso do usuário é medido pelos dias que ele marcou como concluídos.
 */

const CHECKIN_KEY = "checkins_v1";

export function getCheckins(): Set<number> {
    try {
        const raw = localStorage.getItem(CHECKIN_KEY);
        if (!raw) return new Set();
        return new Set(JSON.parse(raw) as number[]);
    } catch {
        return new Set();
    }
}

export function toggleCheckin(dayId: number): Set<number> {
    const set = getCheckins();
    if (set.has(dayId)) set.delete(dayId);
    else set.add(dayId);
    localStorage.setItem(CHECKIN_KEY, JSON.stringify([...set]));
    return set;
}
