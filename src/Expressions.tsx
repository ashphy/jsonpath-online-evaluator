import React from 'react';

function JsonExpressions() {
  return (
    <div className="collapse" id="jsonPathExpressions">
      <div className="card card-body">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>JSONPath</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>$</td>
              <td>the root object/element</td>
            </tr>
            <tr>
              <td>@</td>
              <td>the current object/element</td>
            </tr>
            <tr>
              <td>. or []</td>
              <td>child operator</td>
            </tr>
            <tr>
              <td>..</td>
              <td>recursive descent. JSONPath borrows this syntax from E4X.</td>
            </tr>
            <tr>
              <td>*</td>
              <td>wildcard. All objects/elements regardless their names.</td>
            </tr>
            <tr>
              <td>[]</td>
              <td>
                subscript operator. XPath uses it to iterate over element collections and for predicates. In
                Javascript and JSON it is the native array operator.
              </td>
            </tr>
            <tr>
              <td>[,]</td>
              <td>
                Union operator in XPath results in a combination of node sets. JSONPath allows alternate
                names or array indices as a set.
              </td>
            </tr>
            <tr>
              <td>[start:end:step]</td>
              <td>array slice operator borrowed from ES4.</td>
            </tr>
            <tr>
              <td>?()</td>
              <td>applies a filter (script) expression.</td>
            </tr>
            <tr>
              <td>()</td>
              <td>script expression, using the underlying script engine.</td>
            </tr>
          </tbody>
        </table>
        <a href="https://goessner.net/articles/JsonPath/index.html#e2">
          See: JSONPath expressions - https://goessner.net/
        </a>
      </div>
    </div>
  );
}

export default JsonExpressions;
