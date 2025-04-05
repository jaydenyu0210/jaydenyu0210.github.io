# Social Media Engagement

I pretend myself as the advertisement department of some products or service. I would like to analyze on user engagement patterns in social media, so that it can help improve the social media advertisement effect.

Below are some questions that I came up with:

- Which social media platform (Facebook, Instagram, Twitter, LinkedIn, TikTok, etc.) generates the highest engagement (likes, shares, comments) for my content?

- What type of content (videos, images, text posts, polls, stories) drives the most engagement on each platform?

- When is the best time to post on each platform to maximize likes, shares, and comments?

- Do users engage more with promotional content, educational content, or entertaining content?

- What characteristics (hashtags, post length, emotions, call-to-action) make a post more likely to be shared?

- How does engagement differ between platforms (e.g., Instagram vs. LinkedIn) for the same type of content?

Then I was able to find this dataset on Kaggle that relates to social media user engagement. 
https://www.kaggle.com/datasets/abdullah0a/social-media-sentiment-analysis-dataset

This dataset is able to help me answer a few of the questions above.

1. What type of content (videos, images, text posts, polls, stories) drives the most engagement on each platform?

SQL query:
SELECT `Post Type`, SUM(`Number of Likes`) AS `Total Likes`, SUM(`Number of Shares`) AS `Total Shares`, SUM(`Number of Comments`) AS `Total Comments` FROM synthetic_social_media_data
GROUP BY `Post Type`;

Result:


3. When is the best time to post on each platform to maximize likes, shares, and comments?
