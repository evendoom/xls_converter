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
    cleanNasties(dppValues); // needs to come last to avoid `&amp;` on HTML page
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
        let xmlData = genXML(dppValues);
        saveFile(xmlData, dppValues);
    });
}

// Function to generate an XML
const genXML = (vals) => {
    let xmlData = `
        <Programme xmlns="http://www.digitalproductionpartnership.co.uk/ns/as11/2013">
        <Editorial>
        <SeriesTitle>${vals.seriesTitle}</SeriesTitle>
        <ProgrammeTitle>${vals.programmeTitle}</ProgrammeTitle>
        <EpisodeTitleNumber>${vals.episodeTitle}</EpisodeTitleNumber>
        <ProductionNumber>${vals.prodNumber}</ProductionNumber>
        <Synopsis>${vals.synopsis}</Synopsis>
        <Originator>${vals.originator}</Originator>
        <CopyrightYear>${vals.copyYear}</CopyrightYear>
        <Genre>${vals.genre}</Genre>
        <Distributor>${vals.distributor}</Distributor>
        </Editorial>
        <Technical>
        <ShimName>UK DPP HD</ShimName>
        <ShimVersion>1.1</ShimVersion>
        <Video>
        <VideoBitRate unit="Mbps">100</VideoBitRate>
        <VideoCodec>ProRes</VideoCodec>
        <VideoCodecParameters>High 4:2:2 Intra@L4.1</VideoCodecParameters>
        <PictureFormat>1080i/50</PictureFormat>
        <AFD>10</AFD>
        <PictureRatio>16:9 (1.78:1)</PictureRatio>
        <ThreeD>false</ThreeD>
        <ProductPlacement>false</ProductPlacement>
        <PSEPass>Yes</PSEPass>
        <Manufacturer>Harding</Manufacturer>
        <Version>3.4</Version>
        </Video>
        <Audio>
        <AudioSamplingFrequency unit="kHz">48</AudioSamplingFrequency>
        <AudioBitDepth>24</AudioBitDepth>
        <AudioCodecParameters>Uncompressed PCM</AudioCodecParameters>
        <RDD6DolbyVANC></RDD6DolbyVANC>
        <AudioTrackLayout></AudioTrackLayout>
        <PrimaryAudioLanguage>eng</PrimaryAudioLanguage>
        <SecondaryLanguage>zxx</SecondaryLanguage>
        <TertiaryLanguage>zxx</TertiaryLanguage>
        <AudioLoudnessStandard>EBU 128</AudioLoudnessStandard>
        </Audio>
        <Timecodes>
        <LineUpStart>09:59:30:00</LineUpStart>
        <IdentClockStart>09:59:50:00</IdentClockStart>
        <Parts>
        </Parts>
        </Timecodes>
        <AccessServices>
        <AudioDescriptionPresent>false</AudioDescriptionPresent>
        <ClosedCaptionsPresent>false</ClosedCaptionsPresent>
        <OpenCaptionsPresent>false</OpenCaptionsPresent>
        <SigningPresent>No</SigningPresent>
        </AccessServices>
        <Additional>
        <CompletionDate></CompletionDate>
        <TextlessElementsExist>true</TextlessElementsExist>
        <ProgrammeHasText>true</ProgrammeHasText>
        <ProgrammeTextLanguage>eng</ProgrammeTextLanguage>
        <AssociatedMediaFilename></AssociatedMediaFilename>
        </Additional>
        <ContactInformation>
        <ContactEmail>${vals.email}</ContactEmail>
        <ContactTelephoneNumber>${vals.phoneNum}</ContactTelephoneNumber>
        </ContactInformation>
        </Technical>
        </Programme>
    `
    return xmlData;
}

// Function to save XML to local disc
const saveFile = (file, dppValues) => {
    let bb = new Blob([file], { type: 'text/xml' });
    let anchor = document.createElement('a');
    anchor.download = `${dppValues.seriesTitle}-${dppValues.episodeTitle}.xml`;
    anchor.href = window.URL.createObjectURL(bb);
    anchor.click();
}

// Function to remove weird characters (& and ’) from synopsis
const cleanNasties = (obj) => {
    
    for (let key in obj) {
        obj[key] = obj[key].replaceAll(`&`, `&amp;`);
        obj[key] = obj[key].replaceAll(`’`, `'`);
    }
}