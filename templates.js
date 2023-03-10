export const domTemplates = {
    result:`
    <div class="content">
        <h2>This is what I got:</h2>
        <p class="seriesTitle"></p>
        <p class="programmeTitle"></p>
        <p class="episodeTitle"></p>
        <p class="prodNumber"></p>
        <p class="synopsis"></p>
        <p class="originator"></p>
        <p class="copyYear"></p>
        <p class="genre"></p>
        <p class="distributor"></p>
        <p class="email"></p>
        <p class="phoneNum"></p>
        <p>Is this correct?</p>
        <div class="buttons">
            <button class="btn btn-success confirm-btn save" type="button" id="submitBtn">Yazzz Queen!</button>
        </div>
    </div>
    `,
    beautiful: `
    <div class="main-ctn">
        <h1>Beautiful!</h1>
        <h3>Check your 'downloads' folder:</h3>
        <h5><span id="filename"></span>.xml</h5>
        <a href="" class="btn btn-success" type="button">Back to Main Page</a>
    </div>
    `
}