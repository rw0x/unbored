
function unbored()
{
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
    `
    document.getElementById("unboredCanvas")
}
unbored();

