import { getElement } from "@tolokoban/tgd"

import "./index.css"

async function start() {
    const splash = getElement("#splash-screen")
    splash.classList.add("vanish")
    window.setTimeout(() => splash.parentNode?.removeChild(splash), 1000)
}

function registerServiceWorker() {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("./service-worker.js")
            .then(registration => {
                console.log("SW registered: ", registration)
            })
            .catch(registrationError => {
                console.log("SW registration failed: ", registrationError)
            })
    }
}

start()
