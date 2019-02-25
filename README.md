# Mock ML server for Semantic Search

Mock API server that simulates the NLP server that processes documents for semantic search

### Installation

```
yarn install
```

### Running the server

```
node server.js
```

The server runs on port `5000`.

## USAGE

The server has a single endpoint that accepts a JSON request and returns a JSON response. The request contains thee contents of the document to process and
the response contains the results.

### `POST /process-document`

### Request Schema

The request body is an object with the following properties

| Property        | Description
------------------|--------------
`searchTerm`      | The concept to search for
`contents`        | An object where each key is a page number and the value is the contents of the page. This is the same shape as the `fullText` property in Uwazi documents

**Sample request**:

```json
{   
    "searchTerm": "This is the concept to search for",
    "contents": {
        "1": "This is the content of the first page",
        "2": "This is the content of the second page"
    }
}
```

### Response Schema

The response is an array of result items, where each result is an object
of the following properties

| Property  | description
------------|-------------
`text`      | The text snipped that was matched
`score`     | The score of the selected text snippet
`page`      | The page where the snippet comes from

**Sample response**:

```json
[
    {
        "page": 2, "text": "This is the content", "score": 0.7
    },
    {
        "page": 1, "text": "This is the content", "score": 0.7
    },
    {
        "page": 1, "text": "of the first page", "score: 0.4"
    },
    {
        "page": 2, "text": "of the second page", "score": 0.3
    }
]
```


The mock server does not actually process the documents it receives, instead it simulates the process by splitting the sentences in each page (using `.` as a separator) and assigns each sentence a random score.