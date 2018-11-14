

const getCameras = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices()
    return devices.filter(({ kind }) => kind === 'videoinput')
}

const loadVideo = cameraId => {
    return new Promise((resolve, reject) => {
        // globalData.video = document.getElementById('video')
        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                video: {
                    deviceId: { exact: cameraId },
                },
            }, handleVideo, videoError)
        }

        async function handleVideo(stream) {
            const video = document.getElementById('video')
            // TO DO: remove
            // const imgBlob = await getImgBlob(stream)
            // const { width, height } = await getInputImgSize(imgBlob)
            // const windowP = window.innerWidth / window.innerHeight
            // const imgP = width / height
            // globalData.calcWidth = windowP > imgP ? imgP * window.innerHeight : window.innerWidth
            // globalData.calcHeight = windowP > imgP ? window.innerHeight : window.innerWidth / imgP
            // globalData.video.width = globalData.calcWidth
            // globalData.video.height = globalData.calcHeight
            video.srcObject = stream
            // mainCon = document.getElementById('main')
            // mainCon.style.width = globalData.calcWidth + 'px'
            // mainCon.style.height = globalData.calcHeight + 'px'

            resolve(stream)
        }

        function videoError(e) {
            // do something
            reject(e)
        }
    });
}


const bindPage = async () => {
    document.body.style.height = window.innerHeight + 'px'
    const cameras = await getCameras();
    if (cameras.length === 0) {
        alert('No webcams available.  Reload the page when a webcam is available.');
        return;
    }
    const video = await loadVideo(cameras[0].deviceId)
}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia

bindPage()