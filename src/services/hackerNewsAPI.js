export const fetchTopStories = async (page, pageSize) => {
    const topStoryIds = await fetch(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    ).then((res) => res.json());
  
    const storyDetails = await Promise.all(
      topStoryIds.slice(page * pageSize, (page + 1) * pageSize).map((id) =>
        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then((res) =>
          res.json()
        )
      )
    );
  
    return storyDetails;
  };