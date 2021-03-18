const search = document.getElementById('search');
const matchList  = document.getElementById('match-list')


// Search states.json & filter it
const searchStates = async (searchText) => {
    // fetch api returns a promise, use async & await while dealing with promises
    const res = await fetch('../data/states.json'); 
    const states = await res.json();
    // console.log(states);

    // Get matches to current text input
    let matches = states.filter(state => {  // filter is a higher order array method
        const regexp = new RegExp(`^${searchText}`, 'gi');
        return state.name.match(regexp) || state.abbr.match(regexp);

        // ^ means match only at the beginning
        // RegExp = regular expression
        // g = global, i = case insensitive
    });

    if(searchText.length === 0){
        matches = []; // to clear out the array when you cancel all search letters
        matchList.innerHTML = '';
    }


    //console.log(matches);

    outputHtml(matches); // output the matches
    
}


const outputHtml = (matches) => {
    if(matches.length > 0){
        // map is higher order array method, returns an array from an array
        const html  = matches.map(match => `
            <div class="card card-body mb-1">
                <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
                <small>Lat: ${match.lat} / Long: ${match.long}</small>
            </div>
        `).join('');

        matchList.innerHTML = html;
        // console.log(html);
    } 
}



search.addEventListener('input', () => searchStates(search.value));