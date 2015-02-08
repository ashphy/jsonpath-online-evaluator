evaluate = (event, previousText) ->
  console.log('evaluate')
  query = $('input').val()
  json = JSON.parse($('textarea').val().replace(/(\r\n|\n|\r)/gm, ''))
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
