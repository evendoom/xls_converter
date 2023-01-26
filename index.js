// Import domTemplates
import { domTemplates } from "./templates.js";

// Global Variables
let smtBtn = document.getElementById('submitBtn');
let xlsFileInput = document.getElementById('fileInpt');
let htmlContainer = document.querySelector('.container-fluid');
let xlsFile = null;
let dppValues = {
    seriesTitle:'',
    programmeTitle:'',
    episodeTitle:'',
    prodNumber:'',
    synopsis:'',
    originator:'',
    copyYear:'',
    genre:'',
    distributor:'',
    email:'',
    phoneNum:''
};

// Event listener for main page button
smtBtn.addEventListener('click', () => {
    handleFileAsync(xlsFile);
});

// Event listener for main page file input
xlsFileInput.addEventListener('change', (evt) => {
    xlsFile = evt.target.files[0];
});

// Function to grab data from XLS sheet once HTML button is clicked
const handleFileAsync = async (xlsFile) => {
    const file = xlsFile;
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    
    grabValues(worksheet, dppValues);
    changeDom(htmlContainer);
}

// Function to grab values required for DPP metadata

const grabValues = (data, valObj) => {
    valObj.seriesTitle = data.B1.v.trim();
    valObj.programmeTitle = data.B3.v.trim();
    valObj.episodeTitle = data.B5.v.trim();
    valObj.prodNumber = data.B7.v.trim();
    valObj.synopsis = data.B9.v.trim();
    valObj.originator = data.B11.v.trim();
    valObj.copyYear = data.B13.v.toString().trim();
    valObj.genre = data.B15.v.trim();
    valObj.distributor = data.B17.v.trim();
    valObj.email = data.B19.v.trim();
    valObj.phoneNum = data.B20.v.toString().trim();
}

// Function to alter HTML on main page
const changeDom = (htmlContainer) => {
    // Load HTML Template
    htmlContainer.innerHTML = domTemplates.result;

    // Update HTML with dppValues
    document.querySelector('.seriesTitle').innerText = `Series Title: ${dppValues.seriesTitle}`;
    document.querySelector('.programmeTitle').innerText = `Programme Title: ${dppValues.programmeTitle}`;
    document.querySelector('.episodeTitle').innerText = `Episode Title: ${dppValues.episodeTitle}`;
    document.querySelector('.prodNumber').innerText = `Production Number: ${dppValues.prodNumber}`; 
    document.querySelector('.synopsis').innerText = `Synopsis: ${dppValues.synopsis}`; 
    document.querySelector('.originator').innerText = `Originator: ${dppValues.originator}`;
    document.querySelector('.copyYear').innerText = `Copyright Year: ${dppValues.copyYear}`; 
    document.querySelector('.genre').innerText = `Genre: ${dppValues.genre}`;
    document.querySelector('.distributor').innerText = `Distributor: ${dppValues.distributor}`; 
    document.querySelector('.email').innerText = `Email: ${dppValues.email}`;
    document.querySelector('.phoneNum').innerText = `Phone Number: ${dppValues.phoneNum}`;
    
    // Event listener for confirm button
    let yazQueen = document.querySelector('.save');
    yazQueen.addEventListener('click', () => {
        console.log('hey sexy!');
    })
}