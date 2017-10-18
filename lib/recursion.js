/**
 * Created by czt on 2017/10/18.
 */
var AdmZip = require('adm-zip');


function extract(filePath) {
    try {
        var zip = new AdmZip(filePath);
        var entries = zip.getEntries(); // an array of ZipEntry records
        entries.forEach(function (entry) {
            console.log(entry.toString()); // outputs zip entries information
        });
        return zip;
    } catch (e) {
        console.log(e);
        return null;
    }
}

module.exports = function (filePath, destPath) {
    // reading archives
    var zip = extract(filePath);
    if (zip) {
        zip.extractAllTo(destPath, /*overwrite*/true);
    }
};