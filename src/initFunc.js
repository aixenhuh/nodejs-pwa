let isSubscribed = false;
let appServerPublicKey = 'BL_XaMXE-3zSqjHp3Xd0qhyV2F2wKpM-2EjyZHCEGgHaj_eBlTaP_S44WpEHw2rfi7f-IEiuy1ln_wA0ghbKwfA';
let registInfo = null;

const log = (msg) => { console.log(msg) };

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(regist => {
        console.log("this works");
        registInfo = regist;
        registInfo.pushManager.getSubscription()
        .then(function(pushSubscription) {
            console.log(!(pushSubscription === null));
            isSubscribed = !(pushSubscription === null);
            updateSubscription(pushSubscription);

            isSubscribed ? log("You already subscribed in webpage") : log("you are not Subscriber");

            updateButton();
        })


    });
}

const initPush = () => {
    const pushButton = document.getElementById("pushButton");
    pushButton.addEventListener('click', ()=>{
        console.log(isSubscribed)
        if (!isSubscribed) {
            subscribe();
        } else {
            unsubscribe();
        }

    })
}

const updateSubscription = (subscription) => {
    let detailArea = document.getElementById("subscription_detail");

    if (subscription) {
        detailArea.innerText = JSON.stringify(subscription)
        detailArea.parentElement.classList.remove('hide');
    } else {
        detailArea.parentElement.classList.add('hide');
    }
}

initPush();

// 구독 버튼 상태 갱신
const updateButton = () => {
    // TODO: 알림 권한 거부 처리

    const pushButton = document.getElementById('pushButton')

    // TODO: 알림 권한 거부 처리
    if (Notification.permission === 'denied') {
        pushButton.textContent = 'Push Messaging Blocked';
        pushButton.disabled = true;
        updateSubscription(null);
        return;
    }

    if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
    } else {
    pushButton.textContent = 'Enable Push Messaging';
    }
    pushButton.disabled = false;
}

const subscribe = () => {
    const applicationServerKey = urlB64ToUint8Array(appServerPublicKey);
    registInfo.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    }).then(subscription => {
        console.log('User is subscribed.');
        updateSubscription(subscription);
        isSubscribed = true;
        updateButton();
    })
    .catch(err => {
        updateButton();
    })
}

const unsubscribe = () => {
    registInfo.pushManager.getSubscription()
        .then(subscription => {
            if(subscription) {
                return subscription.unsubscribe();
            }
        })
        .catch(error => {
            console.log('Error unscribing')
        })
        .then(() => {
            updateSubscription(null);
            console.log('User is unsubscribed.');
            isSubscribed = false;
            updateButton();
        })
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}