// CONST
const domSelectors = {
	'AlbumsSearchHeader': '.AlbumsSearch_header',
	'SearchBar': '.searchBar',
	'inputBarSubmit': '.input-bar_submit',
	'albumsContent': '.albums_content',
	'resultCountContainer': '.resultCount_container'
}

const title = "Albums Search";
const submitText = "Search";

function generateHeaderContent(title, submitText) {
	return `
				<h1 class="AlbumsSearch_header_title">${title}</h1>
				<div class="input-bar">
							<input type="text" onClick="SearchArtists" placeholder="Artist Name" class="searchBar" />
							<button class="input-bar_submit">${submitText}</button>
				</div>
	`
}

function generateCount(results, query) {
	return `
		<p class="result_count">
			 ${results.length  - 1}  results  for "${query}"
		</p>
	`
}

function renderCount(results, query) {
	const ele = document.querySelector(domSelectors.resultCountContainer);
	const tmp = generateCount(results, query)
	render(ele, tmp)
}

function renderHeader(title, submitText) {
	const ele = document.querySelector(domSelectors.AlbumsSearchHeader);
	const tmp = generateHeaderContent(title, submitText)
	render(ele, tmp)
}

function generateAlbumItem(album) {
	return `
				<li id="album" class="album_item">
							<img src="${album.artworkUrl100}" alt="">
							<p class="album_title">${album.collectionName}</p>

				</li>
	`
}

function generateAlbumsList(albums) {
	// return albums.map(album => generateAlbumItem(album)).join('')
	 return albums.map(album => generateAlbumItem(album)).join('')
}

function render(element, template){
	element.innerHTML = template;
}

function renderAlbumsList(albums, query){
	const tmp = generateAlbumsList(albums.results)
	const ele = document.querySelector(domSelectors.albumsContent);
	render(ele, tmp)
	renderCount(albums.results, query)
}

// APIs
function getAlbumsList(query){
	let url = `https://itunes.apple.com/search?term=${query}&media=music&entity=album&attribute=artistTerm&limit=200`
	// const promise = fetch(url)
	// promise.then(response => {return response.json()} )
	return fetch(url).then((response) => response.json())
}

function SearchAlbums() {
	let query = ''
	document.querySelector(domSelectors.inputBarSubmit).addEventListener('click', (e) => {
				const inputEle = document.querySelector(domSelectors.SearchBar);

				if(inputEle.value !== undefined){
							query = inputEle.value

							getAlbumsList(query).then(albums => {
								 renderAlbumsList(albums, query);
							})
				}
	})

	// return query
}

// init
renderHeader(title, submitText);
SearchAlbums()