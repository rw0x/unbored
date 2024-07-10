
function unbored()
{
    document.body.innerHTML = document.body.innerHTML + `
        <button class="btn btn-primary scrollarea" type="button" data-bs-toggle="offcanvas" data-bs-target="#unboredCanvas" aria-controls="unboredCanvas">I'm Bored</button>
    
        <div class="offcanvas offcanvas-end" tabindex="-1" id="unboredCanvas" aria-labelledby="unboredPanelTitle">
            <div class="offcanvas-header bg-primary">
            
            <h5 id="unboredPanelTitle">Look Here: </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button></h5>
                
            </div>
            <div class="offcanvas-body text-break" id="offcanvasBody">
            </div>
            <div>
        </div>
    `;
    //setupQueueBuffer();
    handleActivityEndReached(5, 3);
    setupBoundlessScrolling();
}

const unboredBody = document.getElementById('offcanvasBody');

//enables responding to when the user has reached the end of the scroll view. There needs to be currently-existing
//scroll view for this to work.
function setupBoundlessScrolling()
{
    const element = document.getElementById('offcanvasBody');
    let lastScrollTop = 0;
    element.onscroll = (e) =>
    {
        lastScrollTop = element.scrollTop <= 0 ? 0 : element.scrollTop;
        if (element.scrollTop + element.offsetHeight >= element.scrollHeight)
        {
            handleActivityEndReached(5, 5);
            console.log("User reached the end of the scroll view!");
        }
    }
}

//Adds more entries to the buffer. This should run when the user reached the bottom of the page.
function handleActivityEndReached(memeAmount, articleAmount)
{
    //todo: we can setup boundless scrolling here by changing the buffer. we should setup a data sctructure
    //to allow our buffer to update through an interface, which should load content onto the webpage.
    fetchRandomJSON(`https://meme-api.com/gimme/${memeAmount}`).then((response) => {
        for(const meme of response.memes)
        {
            console.log(meme.url) //the png image of the meme as a url link
            addImageToBuffer(meme.url);
        }

    });
    fetchRandomJSON(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&list=random&rnnamespace=0&rnlimit=${articleAmount}`)
        .then((response) => {
            for(const article of response.query.random)
                {
                    console.log(`https://en.wikipedia.org/?curid=${article.id}`);
                    addArticleToBuffer(article.id, article.id);
                    
                }
        });

    
}


function setupQueueBuffer()
{
    const buffer = [];          //the currently displaying scroll buffer.

    const activities = ['Project A', 'Project B', 'Scrolling Fun'];
    buffer.push(...activities);
    displayActivities(buffer);
}

function displayActivities(buffer)
{
    const offcanvasBody = document.getElementById('offcanvasBody');
    offcanvasBody.innerHTML = '';

    buffer.forEach(activity =>
    {
        const listItem = document.createElement('div');
        listItem.textContent = activity;
        listItem.className = 'list-group-item';
        listItem.addEventListener('click', () => handleActivityClick(activity));
        offcanvasBody.appendChild(listItem);
    });
}

function handleActivityClick(activity)
{
    console.log(`Select Activity: ${activity}`);
    const offcanvasBody = document.getElementById('offcanvasBody');

    if (activity.includes('Project'))
    {
        offcanvasBody.innerHTML = `<div class="alert alert-info">Starting ${activity}...</div>`;
        // fixme: this doesn't reset the menu when we close/reopen the offcanvas
        // Implement logic for project
    } else if (activity.includes('API Project'))
    {
        offcanvasBody.innerHTML = `<div class="alert alert-info">Fetching data for ${activity}...</div>`;
        // fixme: this doesn't reset the menu when we close/reopen the offcanvas
        // Implement API fetch logic
    }
}

function addImageToBuffer(imageLink)
{
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", imageLink);
    img.setAttribute("class", "img-fluid");
    div.appendChild(img);
    offcanvasBody.appendChild(div);
}

function addArticleToBuffer(articleTitle, articleText)
{
    let div = document.createElement("div");
    let p = document.createElement("p");
    p.textContent = `${articleTitle} \n ${articleText}`;

    div.appendChild(p);
    offcanvasBody.appendChild(div);
}


//Returns a Promise with JSON data. The JSON data can be accessed via callback ".then((JSON) => { doWorkOnJSON? })"
//url: a URL string that will be used to fetch JSON data.
async function fetchRandomJSON(url) 
{
    try
    {
        const response = await fetch(url);
        if (!response.ok)
        {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return json;
    } catch (error)
    {
        console.error(error.message);
    }
}
unbored();

//for performance sake we should grab several from a single fetch, then store it in the buffer.
//these links show us how to do more things:
//meme api: https://github.com/D3vd/Meme_Api
//wiki api: https://www.mediawiki.org/wiki/API:Random


