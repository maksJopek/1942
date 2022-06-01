// export ine
export interface Score {
  name: string[];
  score: string;
  world: string;
}
export type Storage = Score[];
export function getStorage(): Storage {
  const s = JSON.parse(localStorage.getItem("storage") ?? "{}");
  const storage = [
    { name: "...".split(''), score: "40000", world: "03" },
    { name: "...".split(''), score: "35000", world: "02" },
    { name: "...".split(''), score: "30000", world: "01" },
    { name: "...".split(''), score: "25000", world: "01" },
    { name: "...".split(''), score: "20000", world: "01" },
    { name: "...".split(''), score: "15000", world: "01" },
  ] as Storage;
  if (s[1] == null) return storage
  return s;
}

export function setStorage(s: Storage) {
  localStorage.setItem("storage", JSON.stringify(s))
}

export function getHighscore() {
  return getStorage()[0].score;
}

export function getPlace(s: number): string {
  const storage = getStorage();
  let place = 7
  for (let i = 1; i <= storage.length; i++) {
    let sc = parseInt(storage[i - 1]['score']);
    if (s > sc) {
      place = i; break;
    }
  }
  if (place === 1) return "top";
  else if (place === 2) return "2nd";
  else if (place === 3) return "3rd";
  else return place + "th";
}
