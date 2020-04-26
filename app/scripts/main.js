import '../styles/main.scss';

import $ from 'jquery';
import _ from 'lodash';
import 'bootstrap';
import {JSONPath} from 'jsonpath-plus';

// JsonPath Online Evaluator
class JsonPathOnlineEvaluator {
  constructor() {
    this.evaluate = this.evaluate.bind(this);
    this.editor = ace.edit('json-editor');
    this.editor.setTheme('ace/theme/solarized_dark');
    this.editor.getSession().setMode('ace/mode/json');

    this.resultEditor = ace.edit('result-editor');
    this.resultEditor.setTheme('ace/theme/solarized_dark');
    this.resultEditor.getSession().setMode('ace/mode/json');
    this.resultEditor.setReadOnly(true);

    $('#syntax').on('textchange', this.evaluate);
    $('#path-switch').on('change', this.evaluate);
    this.editor.on('change', this.evaluate);

    this.evaluate();
  }

  evaluate() {
    let json;
    const query = $('#syntax').val();
    const mode = $('#path-switch').is(':checked') ? 'PATH' : 'VALUE';
    const jsonStr = this.editor.getValue();

    try {
      json = JSON.parse(jsonStr.replace(/(\r\n|\n|\r)/gm, ''));
      $('#json-area').removeClass('has-error');
      $('#json-alert').text('');
    } catch (error) {
      this.resultEditor.getSession().setValue('Json Parse Error');
      return;
    }

    const result = JSONPath({
      json,
      path: query,
      resultType: mode,
    });

    if (!_.isEmpty(result)) {
      return this.resultEditor.getSession()
          .setValue(JSON.stringify(result, undefined, 2));
    } else {
      return this.resultEditor.getSession().setValue('No match');
    }
  }
}

$(() => {
  $('#syntax').focus();
  return new JsonPathOnlineEvaluator();
});
