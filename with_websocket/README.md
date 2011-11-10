#### What's this?

Modern browsers have a limit to the timer (setTimeout/setInterval.)
The minimal of delay is 1000 ms in background tabs.
This experimental code lets the browser ignores the limit by force.

#### install & run


    % git clone https://github.com/Kanasansoft/ForcedTimer.git 
    ...
    % cd ForcedTimer
    % cd with_websocket
    % npm install websocket
    ...
    % cd src
    % node server.js

#### run sample

open sample/sample.html in web browser(supported by WebSocket).

#### usage

    //setTimeout
    var timeoutId = ForcedTimer.setTimeout(f1, ms);

    //clearTimeout
    ForcedTimer.clearTimeout(timeoutId);

    //setInterval
    var intervalId = ForcedTimer.setInterval(f2, ms);

    //clearInterval
    ForcedTimer.clearInterval(intervalId);
