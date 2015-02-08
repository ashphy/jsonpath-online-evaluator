evaluate = (event, previousText) ->
  console.log('evaluate')
  query = $('input').val()
  try
    json = JSON.parse($('textarea').val().replace(/(\r\n|\n|\r)/gm, ''))
    $('#json-area').removeClass('has-error');
    $('#json-aler').text('');
  catch e
    $('#json-area').addClass('has-error');
    $('#json-aler').text(e.message);
  result = JSONPath(
    json: json
    path: query)
  $('.result').empty()
  if result
    $('.result').append dump(result)

$ ->
  $('input').on 'textchange', evaluate
  $('textarea').on 'textchange', evaluate
  evaluate()
