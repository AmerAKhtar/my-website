const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = 3000;

app.get('/channels', async (req, res) => {
    const urls = [
        'https://example.com/pakistani-channels1', // Replace with actual URLs
        'https://example.com/pakistani-channels2'
    ];

    const channels = [];

    for (const url of urls) {
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            // Adjust these selectors based on the actual structure of the site
            $('.channel').each((index, element) => {
                const channelName = $(element).find('.name').text(); // Adjust selector
                const channelUrl = $(element).find('.link').attr('href'); // Adjust selector
                channels.push({ name: channelName, url: channelUrl });
            });
        } catch (error) {
            console.error('Error fetching channels:', error);
        }
    }

    res.json(channels);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
