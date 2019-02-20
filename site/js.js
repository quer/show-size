$.getJSON( "http://plex.quers.net:3000/getSpace", function( data ) {
    var items = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if(element.mounted == "/" || element.mounted == "/home/mukuduk/2tb" || element.mounted == "/home/mukuduk/1500gb"){
            var procent = Math.round((element.used / (element.blocks / 100 )) * 100) / 100; 
            var html = "";
            html += '<tr>';
            html += '<th scope="row">' + element.filesystem + '</th>';
            html += '<td>' + getReadableFileSizeString(element.blocks * 1000) + '</td>';
            html += '<td>' + getReadableFileSizeString(element.used * 1000) + '</td>';
            html += '<td>' + getReadableFileSizeString(element.available * 1000) + '</td>';
            html += '<td><div class="progress">';
            html += '<div class="progress-bar" role="progressbar" style="width: '+procent+'%;" aria-valuenow="'+procent+'" aria-valuemin="0" aria-valuemax="100">'+procent+'%</div>';
            html += '</div></td>';
            html += '<td>' + element.capacity + '</td>';
            html += '<td>' + element.mounted + '</td>';
            items.push(html);
        }
    }
   
    $( "#DiskSizeTable" ).html(items.join(""));
});

function getReadableFileSizeString(fileSizeInBytes) {
    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
    do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
    } while (fileSizeInBytes > 1024);

    return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
};