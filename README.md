### UserStory

1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
3. I can get a list of the most recently submitted search strings.

[https://cryptic-ridge-9197.herokuapp.com/api/latest/imagesearch/]
[https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10]

##### Helpful links
Photo Source URLs (Flickr API)
https://www.flickr.com/services/api/

https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
	or
https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
	or
https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)

eg. https://farm8.staticflickr.com/7561/27408406703_fe83c53dd9.jpg


Bing Search API
https://api.datamarket.azure.com/Bing/Search/v1/Image?Query=%27model%27&$format=json
http://stackoverflow.com/questions/26732530/how-do-i-return-json-results-from-bing-search-engine-api
http://stackoverflow.com/questions/27311286/what-are-the-ajax-authorization-headers-for-a-bing-api-request/27315449#27315449
https://www.npmjs.com/package/node-bing-api

