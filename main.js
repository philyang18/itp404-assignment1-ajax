
$('#reddit-form').submit(function(e) {
  e.preventDefault();
  $('#loading-spinner').addClass("loader");
  $('#results').html("");
  $('#error').html("");
  let searchValue = $('#search-bar').val(); 
  $('#search-bar').val("");
  var endpoint = 'https://www.reddit.com/r/' + searchValue + '.json'; 
  let promise = $.ajax({
    type: 'GET',
    url: endpoint
  });
  promise.then((results) => {
    let fragment = document.createDocumentFragment();
    let search_results = results.data.children;
    let p = document.createElement('p');
    p.innerHTML = search_results.length + " results for " + searchValue + ":";
    fragment.append(p);search_results.forEach(function(search_result) {
      let resultDiv = document.createElement('div');
      resultDiv.id = "result-div";
      resultDiv.classList.add("row");
      let score = document.createElement('div');
      score.id = "score";
      score.classList.add("col-lg-1", "col-md-1", "col-sm-2");
      let titleDiv = document.createElement('div');
      titleDiv.id = "title-div";
      titleDiv.classList.add("col-lg-11", "col-md-11", "col-sm-10");
      let title = document.createElement('a');
      title.id = "title";
      title.classList.add("col-12");
      let author = document.createElement('a');
      author.id = "author";
      title.classList.add("col-12");
      score.innerHTML = search_result.data.score;
      title.innerHTML = search_result.data.title;
      title.href = search_result.data.url;
      title.target = "_blank";
      author.innerHTML = `Posted by u/${search_result.data.author}`;titleDiv.append(title);
      titleDiv.append(author);
      resultDiv.append(score);
      resultDiv.append(titleDiv);
      fragment.append(resultDiv);
    });
    $('#loading-spinner').removeClass("loader");
    $('#results').html(fragment);
    $('#error').html("");
  }, function() {
    $('#loading-spinner').removeClass("loader");
    $('#results').html("");
    $('#error').html("No results found.");
  });
});

