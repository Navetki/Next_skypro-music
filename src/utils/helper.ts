import { TrackType } from '@/SharedTypes/ShareTypes';

export function getUniqueValueByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  // БРОНЕБОЙНАЯ ЗАЩИТА: Если пришла ошибка сети или не массив, возвращаем пустой список, не роняя сайт
  if (!arr || !Array.isArray(arr)) {
    return [];
  }

  const uniqueValues = new Set<string>();

  arr.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (typeof v === 'string') {
          uniqueValues.add(v);
        }
      });
    } else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });

  return Array.from(uniqueValues).sort();
}

export const YEAR_OPTIONS = ['По умолчанию', 'Сначала новые', 'Сначала старые'];

export function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;

  return `${minutes}:${outputSeconds}`;
}

export const GetTimePanel = {};
