// Global Variables
let smtBtn = document.getElementById('submitBtn');
let xlsFileInput = document.getElementById('fileInpt');
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

// Event listener for HTML button
smtBtn.addEventListener('click', () => {
    handleFileAsync(xlsFile);
});

// Event listener for HTML input
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
    console.log(dppValues);
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
