import { ref } from "vue"

let timer = null

export const useTimer = () => {
    const seconds = ref(0)
    const minutes = ref(0)
    const hours = ref(0)

    const startTimer = () => {
        timer = setInterval(() => {
            seconds.value++
            if (seconds.value == 60) {
                minutes.value++
                seconds.value = 0
            }
            if (minutes.value == 60) {
                hours.value++
                minutes.value = 0
            }
        }, 1000)
    }

    const stopTimer = () => {
        clearInterval(timer)
        timer = null
    }

    return {
        seconds,
        minutes,
        hours,

        startTimer,
        stopTimer,     
    }
}