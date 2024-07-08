
function unbored() {
    document.body.innerHTML = document.body.innerHTML + `
        <button class="btn btn-primary scrollarea" type="button" data-bs-toggle="offcanvas" data-bs-target="#unboredCanvas" aria-controls="unboredCanvas">I'm Bored</button>
    
        <div class="offcanvas offcanvas-end" tabindex="-1" id="unboredCanvas" aria-labelledby="unboredPanelTitle">
            <div class="offcanvas-header bg-primary">
            
            <h5 id="unboredPanelTitle">Look Here: </h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button></h5>
                
            </div>
            <div class="offcanvas-body text-break">
            
            </div>
            <div>
        </div>
    `;
    setupQueueBuffer();
}

function setupQueueBuffer() {
    const buffer = [];
    const activities = ['Project A', 'Project B', 'API Project X', 'API Project Y'];
    buffer.push(...activities);
    displayActivities(buffer);
}

function displayActivities(buffer) {
    const offcanvasBody = document.getElementById('offcanvasBody');
    offcanvasBody.innerHTML = '';

    buffer.forEach(activity => {
        const listItem = document.createElement('div');
        listItem.textContent = activity;
        listItem.className = 'list-group-item';
        listItem.addEventListener('click', () => handleActivityClick(activity));
        offcanvasBody.appendChild(listItem);
    });
}

function handleActivityClick(activity) {
    console.log(`Select Activity: ${activity}`);
    const offcanvasBody = document.getElementById('offcanvasBody');

    if (activity.includes('Project')) {
        offcanvasBody.innerHTML = `<div class="alert alert-info">Starting ${activity}...</div>`;
        // Implement logic for project
    } else if (activity.includes('API Project')) {
        offcanvasBody.innerHTML = `<div class="alert alert-info">Fetching data for ${activity}...</div>`;
       // Implement API fetch logic
    }
}
unbored();

