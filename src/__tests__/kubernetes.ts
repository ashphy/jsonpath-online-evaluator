import { JSONPath } from 'jsonpath-plus';
import { jsonPath } from '../lib/jsonpath-0.8.0'

const evalJSONPath = (json, path) => {
    return jsonPath(
        json,
        path,
    );
}

const manifest = {
    "kind": "List",
    "items": [
        {
            "kind": "None",
            "metadata": { "name": "127.0.0.1" },
            "status": {
                "capacity": { "cpu": "4" },
                "addresses": [{ "type": "LegacyHostIP", "address": "127.0.0.1" }]
            }
        },
        {
            "kind": "None",
            "metadata": { "name": "127.0.0.2" },
            "status": {
                "capacity": { "cpu": "8" },
                "addresses": [
                    { "type": "LegacyHostIP", "address": "127.0.0.2" },
                    { "type": "another", "address": "127.0.0.3" }
                ]
            }
        }
    ],
    "users": [
        {
            "name": "myself",
            "user": {}
        },
        {
            "name": "e2e",
            "user": { "username": "admin", "password": "secret" }
        }
    ]
};

// https://kubernetes.io/ja/docs/reference/kubectl/jsonpath/
describe('Kubernetes JSONPath Support', () => {
    test('child operator', () => {
        expect(evalJSONPath(manifest, '$.kind')).toStrictEqual(['List']);
    });

    test('the current object', () => {
        expect(evalJSONPath(manifest, '@')).toStrictEqual(manifest);
    });

    test('recursive descent', () => {
        expect(evalJSONPath(manifest, '$..name')).toStrictEqual([
            '127.0.0.1',
            '127.0.0.2',
            'myself',
            'e2e'
        ]);
    });

    test('wildcard. Get all objects', () => {
        expect(evalJSONPath(manifest, '$.items[*].metadata.name')).toStrictEqual([
            '127.0.0.1',
            '127.0.0.2',
        ]);
    });

    test('subscript operator', () => {
        expect(evalJSONPath(manifest, '$.users[0].name')).toStrictEqual(['myself']);
    });

    test('union operator', () => {
        expect(evalJSONPath(manifest, "$.items[*]['metadata.name', 'status.capacity']"))
            .toStrictEqual([
                '127.0.0.1',
                '127.0.0.2',
                'map[cpu:4]',
                'map[cpu:8]'
            ]);
    });

    test('filter', () => {
        expect(evalJSONPath(manifest, '$.users[?(@.name=="e2e")].user.password')).toStrictEqual(['secret']);
    });

    test('iterate list', () => {
        expect(evalJSONPath(manifest, '$.items[*].metadata.name')).toStrictEqual([
            '127.0.0.1',
            '127.0.0.2',
        ]);
    });
});