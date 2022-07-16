const videoGrid = document.getElementById("video-grid");
const myPeer = new Peer();
const myVideo = document.createElement("video");

myPeer.on("open", (id) => {
  document.getElementById("selfid").innerText = id;
  var getUserMedia = navigator.getUserMedia;
  myPeer.on("call", function (call) {
    getUserMedia(
      { video: true, audio: true },
      function (stream) {
        //Video ON/OFF
        document.getElementById("vidtoggle").addEventListener("click", () => {
          if (
            document.getElementById("vidtoggle").className == "btn btn-danger"
          ) {
            document.getElementById("vidtoggle").className = "btn btn-primary";
            document.getElementById("vidtoggle").innerHTML =
              '<i class="fa-solid fa-video"></i>';
            stream.getVideoTracks()[0].enabled = true;
          } else {
            document.getElementById("vidtoggle").className = "btn btn-danger";
            document.getElementById("vidtoggle").innerHTML =
              '<i class="fa-solid fa-video-slash"></i>';
            stream.getVideoTracks()[0].enabled = false;
          }
        });

        //Mic MUTE/UNMUTE
        document.getElementById("mictoggle").addEventListener("click", () => {
          if (
            document.getElementById("mictoggle").className == "btn btn-danger"
          ) {
            document.getElementById("mictoggle").className = "btn btn-primary";
            document.getElementById("mictoggle").innerHTML =
              '<i class="fa-solid fa-microphone"></i>';
            stream.getAudioTracks()[0].enabled = true;
          } else {
            document.getElementById("mictoggle").className = "btn btn-danger";
            document.getElementById("mictoggle").innerHTML =
              '<i class="fa-solid fa-microphone-slash"></i>';
            stream.getAudioTracks()[0].enabled = false;
          }
        });

        stream.getVideoTracks()[0].enabled = false;
        document.getElementById("selfvideo").srcObject = stream;
        document.getElementById("selfvideo").play();
        var myModal = new bootstrap.Modal(
          document.getElementById("exampleModal")
        );
        document.getElementById('modal_caller_id').innerText="from user "+call.peer
        myModal.show();
        console.log(call)
        document.getElementById("answercall").addEventListener("click", () => {
          document.getElementById('callhang').removeAttribute('hidden')
          call.answer(stream); // Answer the call with an A/V stream.
        });
        call.on("stream", function (remoteStream) {
          document.getElementById("othervideo").srcObject = remoteStream;
          document.getElementById("othervideo").play();
        });
      },
      function (err) {
        console.log("Failed to get local stream", err);
      }
    );
  });
});

document.getElementById("call").addEventListener("click", () => {
  document.getElementById('callhang').removeAttribute('hidden')
  calluser(document.getElementById("idtocall").value);
});

document.getElementById("callhang").addEventListener("click", () => {
  location.reload()
});

function calluser(id) {
  navigator.getUserMedia(
    { video: true, audio: true },
    function (stream) {
      //Video ON/OFF
      document.getElementById("vidtoggle").addEventListener("click", () => {
        if (
          document.getElementById("vidtoggle").className == "btn btn-danger"
        ) {
          document.getElementById("vidtoggle").className = "btn btn-primary";
          document.getElementById("vidtoggle").innerHTML =
            '<i class="fa-solid fa-video"></i>';
          stream.getVideoTracks()[0].enabled = true;
        } else {
          document.getElementById("vidtoggle").className = "btn btn-danger";
          document.getElementById("vidtoggle").innerHTML =
            '<i class="fa-solid fa-video-slash"></i>';
          stream.getVideoTracks()[0].enabled = false;
        }
      });

      //Mic MUTE/UNMUTE
      document.getElementById("mictoggle").addEventListener("click", () => {
        if (
          document.getElementById("mictoggle").className == "btn btn-danger"
        ) {
          document.getElementById("mictoggle").className = "btn btn-primary";
          document.getElementById("mictoggle").innerHTML =
            '<i class="fa-solid fa-microphone"></i>';
          stream.getAudioTracks()[0].enabled = true;
        } else {
          document.getElementById("mictoggle").className = "btn btn-danger";
          document.getElementById("mictoggle").innerHTML =
            '<i class="fa-solid fa-microphone-slash"></i>';
          stream.getAudioTracks()[0].enabled = false;
        }
      });

      stream.getVideoTracks()[0].enabled = false;
      document.getElementById("selfvideo").srcObject = stream;
      document.getElementById("selfvideo").play();
      var call = myPeer.call(id, stream);
      console.log(call)
      call.on("stream", function (remoteStream) {
        document.getElementById("othervideo").srcObject = remoteStream;
        document.getElementById("othervideo").play();
      });
    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
}

document.getElementById("copyid").addEventListener("click", () => {
  navigator.clipboard.writeText(document.getElementById("selfid").innerText);
});