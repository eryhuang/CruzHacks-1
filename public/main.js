var initialized = false; // this boolean flag is used so we don't trigger the intialize function twice.

var hashID = null; role = 'prof';

if (window.location.hash.length > 1) { // check if the url contains a hash
    hashID = window.location.hash.substr(1, window.location.hash.length - 1);
    role = 'student';
}

// var lastPeerId = null;

// Create own peer object with connection to shared PeerJS server
peer = new Peer(null, {
    debug: 2
});

peer.on('open', function (id) {
    // Workaround for peer.reconnect deleting previous id
    // if (peer.id === null) {
    //     console.log('Received null id from peer open');
    //     peer.id = lastPeerId;
    // } else {
    //     lastPeerId = peer.id;
    // }

    betterLog('ID: ' + peer.id);
    // if (role === 'student') {
    if (hashID) initializeConnection(hashID);
    // } else {
    //     //
    // }
    initializeQR(peer.id)
});

// peer.on('disconnected', function () {
//     status.innerHTML = "Connection lost. Please reconnect";
//     console.log('Connection lost. Please reconnect');

//     // Workaround for peer.reconnect deleting previous id
//     peer.id = lastPeerId;
//     peer._lastServerId = lastPeerId;
//     peer.reconnect();
// });
// peer.on('close', function () {
//     conn = null;
//     status.innerHTML = "Connection destroyed. Please refresh";
//     console.log('Connection destroyed');
// });
// peer.on('error', function (err) {
//     console.log(err);
//     alert('' + err);
// });











// if (!initialized) initialize(response.ip);
var conn;
function initializeConnection(targetId) {
    conn = peer.connect(targetId);
    betterLog("connection init", conn)
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function () {
        betterLog("sending hi", conn.id)
        // here you have conn.id
        conn.send('hi!');
    });
}

peer.on('connection', function (conn) {
    conn.on('data', function (data) {
        // Will print 'hi!'
        betterLog(data);
    });
});

function sendMsg(msg) {
    if (conn != null) conn.send(msg);
}

function initializeQR(peerId) {

    betterLog("Peer ID: " + peerId);
    $('#my-qr').html("Peer ID: " + peerId);

    new QRCode(document.getElementById("my-qr"),
        "https://matthew-boisvert.github.io/CruzHacks/public/index.html#" + peerId);
    //https://people.ucsc.edu/~rykaande/
}

function betterLog(text1, text2) {
    $('body').append(text1).append(", ").append(text2).append(document.createElement("br"));
};

function shortenLink(longLink) {
    "https://is.gd/create.php?format=simple&url=www.example.com"
    // Using YQL and JSONP
    $.ajax({
        url: "https://is.gd/create.php",

        // The name of the callback parameter, as specified by the YQL service
        jsonp: "callback",

        // Tell jQuery we're expecting JSONP
        dataType: "jsonp",

        // Tell YQL what we want and that we want JSON
        data: {
            url: longLink,
            format: "json"
        },

        // Work with the response
        success: function (response) {
            console.log(response.shorturl); // server response
        }
    });
}

var possibleEmojis = [
    '🐀', '🐁', '🐭', '🐹', '🐂', '🐃', '🐄', '🐮', '🐅', '🐆', '🐯', '🐇', '🐐', '🐑', '🐏', '🐴',
    '🐎', '🐱', '🐈', '🐰', '🐓', '🐔', '🐤', '🐣', '🐥', '🐦', '🐧', '🐘', '🐩', '🐕', '🐷', '🐖',
    '🐗', '🐫', '🐪', '🐶', '🐺', '🐻', '🐨', '🐼', '🐵', '🙈', '🙉', '🙊', '🐒', '🐉', '🐲', '🐊',
    '🐍', '🐢', '🐸', '🐋', '🐳', '🐬', '🐙', '🐟', '🐠', '🐡', '🐚', '🐌', '🐛', '🐜', '🐝', '🐞',
];
function randomEmoji() {

    const randomIndex = Math.floor(Math.random() * possibleEmojis.length);
    return possibleEmojis[randomIndex];
}
const emoji = randomEmoji();