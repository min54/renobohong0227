exports.handler = async () => {
    try {
        const response = await fetch('https://rss.blog.naver.com/rebelleamie.xml', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const xml = await response.text();

        const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => {
            const block = m[1];
            const get = (tag) => {
                const match = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>|<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
                return match ? (match[1] || match[2] || '').trim() : '';
            };
            const thumbMatch = block.match(/url="([^"]+)"/);
            const descRaw = get('description');
            const imgMatch = descRaw.match(/<img[^>]+src="([^"]+)"/i);

            return {
                title: get('title'),
                link: get('link'),
                pubDate: get('pubDate'),
                thumbnail: thumbMatch ? thumbMatch[1] : (imgMatch ? imgMatch[1] : ''),
                description: descRaw.replace(/<[^>]+>/g, '').trim().slice(0, 80)
            };
        }).slice(0, 6);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify(items),
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: e.message }),
        };
    }
};
