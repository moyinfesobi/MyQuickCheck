import axios from 'axios';

export const fetchTopStories = async (page, pageSize) => {
  try {
    // Fetch top story IDs
    const { data: topStoryIds } = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );

    // Fetch details for the selected stories
    const storyDetails = await Promise.all(
      topStoryIds
        .slice(page * pageSize, (page + 1) * pageSize)
        .map((id) =>
          axios
            .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((response) => response.data)
        )
    );

    return storyDetails;
  } catch (error) {
    console.error('Error fetching stories:', error);
    throw error;
  }
};
