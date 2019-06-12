function getData(animeName){
    const url_base = 'https://api.jikan.moe/v3';
    if(animeName.trim().length == 0){
        return fetch(url_base + '/genre/anime/1')
        .then(response => response.json())
        .then(data => data.anime)
    }else{
        return fetch(url_base + '/search/anime?q=' + animeName)
        .then(response => response.json())
        .then(data => data.results)
    }
}

export {getData};