import { JSONPath } from 'jsonpath-plus';
import { jsonPath } from '../lib/jsonpath-0.8.0'

const evalJSONPath = (json, path) => {
    return jsonPath(
        json,
        path,
    );
}

const book1 = {
    "category": "reference",
    "author": "Nigel Rees",
    "title": "Sayings of the Century",
    "price": 8.95
};

const book2 = {
    "category": "fiction",
    "author": "Evelyn Waugh",
    "title": "Sword of Honour",
    "price": 12.99
};

const book3 = {
    "category": "fiction",
    "author": "Herman Melville",
    "title": "Moby Dick",
    "isbn": "0-553-21311-3",
    "price": 8.99
};

const book4 = {
    "category": "fiction",
    "author": "J. R. R. Tolkien",
    "title": "The Lord of the Rings",
    "isbn": "0-395-19395-8",
    "price": 22.99
};

const json = {
    "store": {
        "book": [
            book1,
            book2,
            book3,
            book4
        ],
        "bicycle": {
            "color": "red",
            "price": 19.95
        }
    }
};

// https://goessner.net/articles/JsonPath/index.html#e2
describe('Stefan Goessner JsonPath implementation', () => {
    test('the root object/element', () => {
        expect(evalJSONPath(json, '$')).toStrictEqual([json]);
    });

    test('the current object/element', () => {
        expect(evalJSONPath(json, '$..book[(@.length-1)]')).toStrictEqual([book4]);
    });

    test('child operator', () => {
        expect(evalJSONPath(json, '$.store.bicycle.color')).toStrictEqual(['red']);
    });

    test('recursive descent', () => {
        expect(evalJSONPath(json, '$..author')).toStrictEqual([
            book1['author'],
            book2['author'],
            book3['author'],
            book4['author'],
        ]);
    });

    test('wildcard', () => {
        expect(evalJSONPath(json, '$.store.book.*')).toStrictEqual([
            book1,
            book2,
            book3,
            book4
        ]);
    });

    test('subscript operator', () => {
        expect(evalJSONPath(json, '$..book[2]')).toStrictEqual([book3]);
    });

    test('array slice operator borrowed from ES4', () => {
        expect(evalJSONPath(json, '$..book[1:3]')).toStrictEqual([book2, book3]);
    });

    test('array slice operator with slice', () => {
        expect(evalJSONPath(json, '$..book[0:3:2]')).toStrictEqual([book1, book3]);
    });

    test('array slice operator with end', () => {
        expect(evalJSONPath(json, '$..book[:2]')).toStrictEqual([book1, book2]);
    });

    test('applies a filter expression', () => {
        expect(evalJSONPath(json, '$..book[?(@.isbn)]')).toStrictEqual([
            book3,
            book4,
        ]);
    });

    test('applies a script expression', () => {
        expect(evalJSONPath(json, '$..book[?(@.price<10)]')).toStrictEqual([
            book1,
            book3,
        ]);
    });
});