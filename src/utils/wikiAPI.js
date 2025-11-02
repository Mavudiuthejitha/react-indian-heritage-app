export async function fetchWikiData(title) {
  try {
    const summaryRes = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );
    const summary = await summaryRes.json();

    const imagesRes = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        title
      )}&prop=images&format=json&origin=*`
    );
    const imagesJson = await imagesRes.json();
    const page = Object.values(imagesJson.query.pages)[0];
    const imageNames = page.images ? page.images.map((i) => i.title) : [];
    const imageUrls = await Promise.all(
      imageNames.map(async (img) => {
        const info = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
            img
          )}&prop=imageinfo&iiprop=url&format=json&origin=*`
        );
        const data = await info.json();
        const first = Object.values(data.query.pages)[0];
        return first.imageinfo ? first.imageinfo[0].url : null;
      })
    );

    return { extract: summary.extract, images: imageUrls.filter(Boolean) };
  } catch (e) {
    console.error(e);
    return null;
  }
}
