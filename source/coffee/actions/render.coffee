class Render

  diffDOM: null

  diff: ( $element, newHTML ) ->
    oldDOM = _.first $element.find ':first-child'
    newDOM = _.first $ newHTML
    midDOM = @diffDOM.diff oldDOM, newDOM
    @diffDOM.apply oldDOM, midDOM

  constructor: ( @state ) ->
    @diffDOM = new diffDOM