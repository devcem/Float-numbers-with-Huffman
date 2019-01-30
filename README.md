# Float-numbers-with-Huffman
This library designed to compress a JSON string that contains float numbers. It uses Huffman algorithm (except order) to compress JSON string.

## Reason
I'm using socket.io on my online games because of simplicity and advantages of JSON format. However transfering position and rotation data over JSON format costs too much bandwidth. This is why I wrote this simple library. The library compresses JSON format that contains float numbers and provides an ASCI output that can be used on socket.io data transfer.

Also, compressing all data on socket.io causes another problem. It sends extra bytes to catch byte point or cursor. Because of that it continues to send JSON data and that makes it useless for compression.

## Advantages
+ Very simple
+ Works on browser
+ Easy to implement
+ It's still possible to use JSON format

## Examples
I'm sending position and rotation data like this :
```[1,0,-108.566,2.200,0.182,0.800,0.00044049781129770765,-89.968]```

It costs 63 bytes, this is random data captured from my FPS game.

When we compress this data with this compressor, it provides an ASCI output like this :
```ñ`Í!6Îøvx,¤ð\à°¨Z":í5tóþ```

And this output costs 23 bytes which is perfect for most cases.

Simply using encode function encodes JSON and decode function decodes ASCI output. Here is an full example :
```var value   = JSON.stringify([1,0,-108.566,2.200,0.182,0.800,0.00044049781129770765,-89.968]);```
```var encoded = floatCompress.encode(value);```
```var decoded = floatCompress.decode(encoded);```

## TODO
+ Consider to use sort function to provide better compression quality.
+ Consider to support all characters to provide a reliable library for socket.io