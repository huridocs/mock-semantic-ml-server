const express = require('express');
const bodyParser = require('body-parser');

function processDocument(doc) {
    return Object.keys(doc).reduce((results, page) => {
        const text = doc[page];
        const pageResults = processPage(page, text);
        return [
            ...results,
            ...pageResults
        ]
    }, []);
}

function processPage(page, text) {
    // strip page annotations from text
    const plainText = text.replace(/\[\[\d+\]\]/g, '');
    const sentences = plainText.split('.');
    const results = sentences.map(text => ({
        page,
        text,
        score: Math.random()
    }));
    return results;
}

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json({ limit: '20mb' }));

app.post('/semanticSearch/searchOneDoc', (req, res) => {
    const { contents } = req.body;
    const results = processDocument(contents);
    console.log('results', results);
    res.status(200).send(results);
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
