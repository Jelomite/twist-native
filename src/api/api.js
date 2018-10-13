const Proxy2 = "https://cors-anywhere.herokuapp.com/";

const APIURL = "https://twist.moe/feed/anime?format=json";
const APIEPURL = "https://twist.moe/feed/episodes?format=json&kitsuId=";

const load = async (): Promise<Array<[{}]>> => {
  const output: any = [];
  try {
    const sourceAPI = await fetch(APIURL);
    const sourceJSON = await sourceAPI.json();
    const {items} = sourceJSON;
    const que = items.map((element: any, index: number) => {
      return output.push({
        title: element.title,
        ongoing: element["anime:ongoing"],
        link: element.link,
        mal: element["mal:id"],
        kitsu: element["kitsu:id"],
        twist: element["animetwist:id"]
      });
    });
    if (que) {
      return output;
    }
  } catch (error) {
    return error;
  }
  return [];
};

const loadEpisodeList = async (id: number): Promise<Array<[{}]>> => {
  const output: any = [];
  try {
    const sourceAPI = await fetch(APIEPURL + id);
    const sourceJSON = await sourceAPI.json();
    const {items} = sourceJSON;
    const que = items.map((element: any, index: number) => {
      return output.push({
        title: element.title,
        episode: element["episode:number"],
        link: element.link,
        mal: element["mal:id"],
        kitsu: element["kitsu:id"],
        twist: element["animetwist:id"]
      });
    });
    if (que) {
      return output;
    }
  } catch (error) {
    return error;
  }
  return [];
};

const Twist = {
  load,
  loadEpisodeList
};

export default Twist;
