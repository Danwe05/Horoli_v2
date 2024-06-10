import React, { useEffect, useState } from 'react';
import AgoraRTC from 'agora-rtc-sdk';

const VideoChat = () => {
  const [client, setClient] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);

  useEffect(() => {
    const appId = '6aa197198ab74785a59f97abbe16141b';
    const channel = 'horohouse';
    const uid = Math.floor(Math.random() * 10000);

    const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });

    client.init(appId, () => {
      console.log('Client initialized');
      client.join(channel, uid, (uid) => {
        console.log('User ' + uid + ' joined channel successfully');
        setClient(client);

        const localStream = AgoraRTC.createStream({ audio: true, video: true });

        localStream.init(() => {
          console.log('Local stream initialized');
          localStream.play('local-stream');
          setLocalStream(localStream);

          client.publish(localStream);
        }, (error) => {
          console.log(error);
        });
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      console.log(err);
    });

    client.on('stream-added', (evt) => {
      const stream = evt.stream;
      console.log('Stream added: ' + stream.getId());
      client.subscribe(stream);
    });

    client.on('stream-subscribed', (evt) => {
      const stream = evt.stream;
      console.log('Stream subscribed: ' + stream.getId());
      setRemoteStreams((prevStreams) => [...prevStreams, stream]);
    });

    return () => {
      if (localStream) {
        localStream.close();
      }
      if (client) {
        client.leave();
      }
    };
  }, []);

  return (
    <div>
      <video id="local-stream" autoPlay muted />
      {remoteStreams.map((stream) => (
        <video key={stream.getId()} autoPlay />
      ))}
    </div>
  );
};

export default VideoChat;